import type Card from "./Card";
import Tile from "./Tile";

export default class Board {

    private tableau: Tile[][];
    public reynieActivated: boolean = false;
  
    constructor() {

        const hautGauche : Tile= new Tile(true, false, false, true); 
        const hautMilieu : Tile= new Tile( true, false, false, false);
        const hautDroite : Tile= new Tile(true, false, true, false);

        
        const milieuGauche : Tile= new Tile(false, false, false, true);
        const milieu : Tile= new Tile(false, false, false, false);
        const milieuDroite : Tile= new Tile(false, true, false, false); 

        const basGauche : Tile= new Tile(false, false, true, true);
        const basMilieu : Tile= new Tile(false, false, true, false);
        const basDroite : Tile= new Tile(false, true, true, false);
        
      this.tableau = [
        [hautGauche, hautMilieu, hautDroite],
        [milieuGauche, milieu, milieuDroite],
        [basGauche, basMilieu, basDroite],
      ];
    }
  

    getTableau(): Tile[][] {
        return this.tableau;
    }

    private countCardsByType(cardType: string): number {
        let count = 0;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if (element.card && !element.card.hidden && element.card[cardType  as keyof Card]) {
                    count++;
                }
            });
        });
        return count;
    }

    getErudits(): number {
        return this.countCardsByType("isErudit");
    }

    getJardiniers(): number {
        return this.countCardsByType("isJardinier");
    }

    getPeintres(): number {
        return this.countCardsByType("isPeintre");
    }

    getArchitectes(): number {
        return this.countCardsByType("isArchitecte");
    }

    getEcrivains(): number {
        return this.countCardsByType("isEcrivain");
    }

    getMusiciens(): number {
        return this.countCardsByType("isMusicien");
    }

    getNobles(): number {
        return this.countCardsByType("isNoble");
    }

    getPoison(): number {
        return this.countCardsByType("isPoison");
    }

    getFavorite(): number {
        return this.countCardsByType("isFavorite");
    }

    getMillitaire(): number {
        return this.countCardsByType("isMillitaire");
    }
    
    getHommedEtat(): number {
        return this.countCardsByType("isHommedEtat");
    }    
    
    getClerge(): number {
        return this.countCardsByType("isClerge");
    }

    computeAdjacentNobles() {
        let sumAdjacentNobles = 0 ;
        this.tableau.forEach((row, rowIndex) => {
            row.forEach((element, colIndex) => {
                if(element.card && !element.card.hidden && element.card.ifAdjacentNobleBonus) {
                   if(!this.getElementAbove(rowIndex, colIndex)?.card?.hidden && this.getElementAbove(rowIndex, colIndex)?.card?.isNoble) {
                        sumAdjacentNobles+=element.card.ifAdjacentNobleBonus;}
                   if(!this.getElementBelow(rowIndex, colIndex)?.card?.hidden && this.getElementBelow(rowIndex, colIndex)?.card?.isNoble) {
                        sumAdjacentNobles+=element.card.ifAdjacentNobleBonus;}
                   if(!this.getElementLeft(rowIndex, colIndex)?.card?.hidden && this.getElementLeft(rowIndex, colIndex)?.card?.isNoble) {
                        sumAdjacentNobles+=element.card.ifAdjacentNobleBonus;}
                   if(!this.getElementRight(rowIndex, colIndex)?.card?.hidden && this.getElementRight(rowIndex, colIndex)?.card?.isNoble) 
                        sumAdjacentNobles+=element.card.ifAdjacentNobleBonus;
                }
            });
        });
        return sumAdjacentNobles;
    }


    computeAdjacentErudits() {
        let sumAdjacentErudits = 0 ;
        this.tableau.forEach((row, rowIndex) => {
            row.forEach((element, colIndex) => {
                if(element.card && !element.card.hidden && element.card.ifAdjacentEruditBonus) {
                   if(!this.getElementAbove(rowIndex, colIndex)?.card?.hidden && this.getElementAbove(rowIndex, colIndex)?.card?.isErudit) {
                        sumAdjacentErudits+=element.card.ifAdjacentEruditBonus;}
                   if(!this.getElementBelow(rowIndex, colIndex)?.card?.hidden && this.getElementBelow(rowIndex, colIndex)?.card?.isErudit) {
                        sumAdjacentErudits+=element.card.ifAdjacentEruditBonus;}
                   if(!this.getElementLeft(rowIndex, colIndex)?.card?.hidden && this.getElementLeft(rowIndex, colIndex)?.card?.isErudit) {
                        sumAdjacentErudits+=element.card.ifAdjacentEruditBonus;}
                   if(!this.getElementRight(rowIndex, colIndex)?.card?.hidden && this.getElementRight(rowIndex, colIndex)?.card?.isErudit) 
                        sumAdjacentErudits+=element.card.ifAdjacentEruditBonus;
                }
            });
        });
        return sumAdjacentErudits;
    }

    getScore() : number {
        
       let cardsValue:number = 0;
       cardsValue += this.computeCardsSum();
       cardsValue += this.computeCardsIfTop();
       cardsValue += this.computeCardIfOtherCards();
       cardsValue += this.computeAdjacentNobles();
       cardsValue += this.computeAdjacentErudits();
       cardsValue += this.computeByDifferentMetiers();
       cardsValue += this.computeReynie();
       cardsValue += this.computeCardsIfMiddle();
       cardsValue += this.computeCardsByFavorite();
       cardsValue += this.computeReynie();
       return cardsValue;
    }

    computeCardsByFavorite() : number {
        let sumFavorite = 0 ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden && element.card.pointsByFavorite) {
                    sumFavorite += this.getFavorite()*element.card.pointsByFavorite;
                }
            });
        });
        return sumFavorite;
    }

    computeByDifferentMetiers() : number {
        let sum = 0 ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden) {
                    sum += element.card.value || 0;
                }
            });
        });
        return sum;
    }

    // +1 + Erudit si n°
    // 

    computeReynie(): number {
        return this.reynieActivated ? this.getPoison() * -2 : 0;
    }

    computeCardsSum(): number {
        let sum = 0 ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden && element.card.countByMetiers) {
                    let metiersTable = [];
                    metiersTable.push(this.getJardiniers());
                    metiersTable.push(this.getArchitectes());
                    metiersTable.push(this.getEcrivains());
                    metiersTable.push(this.getMusiciens());
                    metiersTable.push(this.getPeintres());
                    metiersTable = metiersTable.filter((val )=> val !=0);
                    switch (metiersTable.length) {
                        case 2:
                            sum += 1;
                        break;
                        case 3:
                            sum += 3;
                        break;
                        case 4:
                            sum += 5;
                        break;
                        case 5:
                            sum += 8;
                        break;
                
                        default:
                            break;
                    }
                }
            });
        });
        return sum;
    }

    

    computeCardsIfMiddle() : number {
        let sumMiddle = 0 ;
        this.tableau.forEach((row, rowIndex) => {
            row.forEach((element, colIndex) => {
                if(element.card && !element.card.hidden && (rowIndex==1 && colIndex ==1)) {
                    sumMiddle += element.card.ifMiddleValue || 0;
                }
            });
        });
        return sumMiddle;
    }

    computeCardsIfTop() : number {
        let sumTop = 0 ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden && element.isTop) {
                    sumTop += element.card.ifTopValue || 0;
                }
            });
        });
        return sumTop;
    }

    computeCardIfOtherCards(): number {
        let sumCardsIfOtherCards = 0;
    
        this.tableau.forEach(row => {
            row.forEach(element => {
                const card = element?.card;

                if(card && !card.hidden && card.otherCardsRules && card.otherCardsRules.length) {
                    card.otherCardsRules.forEach(rule => {
                        if (card && !card.hidden && rule.ifOtherCards?.length) {
                            const othercardFound = rule.ifOtherCards.every((otherCard: number) => {
                                return this.tableau.some(row2 => row2.some(element2 => element2.card?.id === otherCard && !element2.card?.hidden));
                            });
            
                            if (othercardFound) {
                                sumCardsIfOtherCards += rule.ifOtherCardsValue || 0;
                            }
                        }
                    });
                }
    
                
            });
        });
    
        return sumCardsIfOtherCards;
    }

    getElement(row: number, col: number): Tile | undefined {
      // Vérifier si les indices sont valides
      if (row >= 0 && row < 3 && col >= 0 && col < 3) {
        return this.tableau[row][col];
      } else {
        return undefined;
      }
    }

    setElement(row: number, col: number, tile: Tile): void {
        // Vérifier si les indices sont valides
          this.tableau[row][col] = tile;
      }
  
    getElementAbove(row: number, col: number): Tile | undefined {
      return this.getElement(row - 1, col);
    }
  
    getElementBelow(row: number, col: number): Tile | undefined {
      return this.getElement(row + 1, col);
    }
  
    getElementLeft(row: number, col: number): Tile | undefined {
      return this.getElement(row, col - 1);
    }
  
    getElementRight(row: number, col: number): Tile | undefined {
      return this.getElement(row, col + 1);
    }
  
    // Ajoutez d'autres fonctions selon les besoins pour obtenir d'autres éléments adjacents
  
    // Exemple d'utilisation :
    // let element = tableau.getElementAbove(1, 1);
  }
