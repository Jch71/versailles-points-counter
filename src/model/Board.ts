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

    getFemmes(): number {
        return this.countCardsByType("isFemme");
    }

    getEcrivains(): number {
        let sumEcrivain = this.countCardsByType("isEcrivain") ;
        let found21: boolean= false;
        let found20: boolean= false;

        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden && element.card.id == 21) {
                    found21=true;
                }
                if(element.card && !element.card.hidden && element.card.id == 20) {
                    found20=true;
                }
            });
        });

        if(found20 && found21) {
            sumEcrivain+=2;
        }
        return sumEcrivain;
    }

    getMusiciens(): number {
        return this.countCardsByType("isMusicien");
    }

    getNobles(): number {
        return this.countCardsByType("isNoble");
    }

    getHidden(): number {
        let count = 0;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if (element.card && element.card.hidden) {
                    count++;
                }
            });
        });
        return count;
    }

    getPoison(): number {
        let sumPoison = this.countCardsByType("isPoison") ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden && element.card.id == 58) {
                    sumPoison += 2;
                }
            });
        });
        return sumPoison;
    }

    getFavorite(): number {
        return this.countCardsByType("isFavorite");
    }

    getMillitaire(): number {
        let sumMillitaire = this.countCardsByType("isMillitaire") ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden && element.card.id == 14) {
                    sumMillitaire += 2;
                }                 
                if(element.card && !element.card.hidden && element.card.id == 37) {
                    sumMillitaire += 1;
                } 

                
            });
        });
        return sumMillitaire;
    }
    
    getHommedEtat(): number {
        return this.countCardsByType("isHommedEtat");
    }    
    
    getClerge(): number {
        return this.countCardsByType("isClerge");
    }

    
    computeAdjacentHommedEtat() {
        let sumAdjacentHommedEtat = 0 ;
        this.tableau.forEach((row, rowIndex) => {
            row.forEach((element, colIndex) => {
                if(element.card && !element.card.hidden && element.card.ifAdjacentHommedEtatBonus) {
                   if(!this.getElementAbove(rowIndex, colIndex)?.card?.hidden && this.getElementAbove(rowIndex, colIndex)?.card?.isHommedEtat) {
                        sumAdjacentHommedEtat+=element.card.ifAdjacentHommedEtatBonus;}
                   if(!this.getElementBelow(rowIndex, colIndex)?.card?.hidden && this.getElementBelow(rowIndex, colIndex)?.card?.isHommedEtat) {
                        sumAdjacentHommedEtat+=element.card.ifAdjacentHommedEtatBonus;}
                   if(!this.getElementLeft(rowIndex, colIndex)?.card?.hidden && this.getElementLeft(rowIndex, colIndex)?.card?.isHommedEtat) {
                        sumAdjacentHommedEtat+=element.card.ifAdjacentHommedEtatBonus;}
                   if(!this.getElementRight(rowIndex, colIndex)?.card?.hidden && this.getElementRight(rowIndex, colIndex)?.card?.isHommedEtat) 
                        sumAdjacentHommedEtat+=element.card.ifAdjacentHommedEtatBonus;
                }
            });
        });
        return sumAdjacentHommedEtat;
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
       cardsValue += this.computeCardsIfLeft();
       cardsValue += this.computeCardsIfRight();
       cardsValue += this.computeCardsIfBottom();
       cardsValue += this.computeCardsIfMiddle();
       cardsValue += this.computeCardsIfExt();
       cardsValue += this.computeCardIfOtherCards();
       cardsValue += this.computeAdjacentNobles();
       cardsValue += this.computeAdjacentHommedEtat();
       cardsValue += this.computeAdjacentErudits();
       cardsValue += this.computeByDifferentMetiers();
       cardsValue += this.computeCardsByFavorite();
       cardsValue += this.computeCardsByFemme();
       cardsValue += this.computeAdjacentCards();
       cardsValue += this.computeCardsByClerge();
       cardsValue += this.computeCardsByEcrivain();
       cardsValue += this.computeCardsByPoison();
       cardsValue += this.computeCardsByHidden();
       cardsValue += this.computeByDifferentTypes();
       cardsValue += this.computeReynie();
       return cardsValue;
    }

    
    computeCardsByHidden(): number {
        let sum = 0;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if (element.card && !element.card.hidden && element.card.pointsByHidden) {
                    sum += this.getHidden() *  element.card.pointsByHidden;
                }
            });
        });
        return sum;
    }

    computeCardsByCriterion(property: string, getMultiplier: () => number): number {
        let sum = 0;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if (element.card && !element.card.hidden && element.card[property as keyof Card]) {
                    let number: number = element.card[property as keyof Card] as number || 0
                    sum += getMultiplier() * number;
                }
            });
        });
        return sum;
    }
    
    computeCardsByFavorite(): number {
        return this.computeCardsByCriterion('pointsByFavorite', () => this.getFavorite());
    }
    
    computeCardsByClerge(): number {
        return this.computeCardsByCriterion('pointsByClerge', () => this.getClerge());
    }

    computeCardsByFemme(): number {
        return this.computeCardsByCriterion('pointsByFemme', () => this.getFemmes());
    }
    
    computeCardsByEcrivain(): number {
        return this.computeCardsByCriterion('pointsByEcrivain', () => this.getEcrivains()); 
    }

    computeCardsByPoison(): number {
        return this.computeCardsByCriterion('pointsByPoison', () => this.getPoison()); 
    }

    computeAdjacentCards(): number {
        let sum = 0;
    
        this.tableau.forEach((row, rowIndex) => {
            row.forEach((element, colIndex) => {
   
                if (element.card && !element.card.hidden && element.card.adjacentCardsRules) {
                   
                    const adjacentCardIds = [
                        !this.getElementAbove(rowIndex, colIndex)?.card?.hidden && this.getElementAbove(rowIndex, colIndex)?.card?.id,
                        !this.getElementBelow(rowIndex, colIndex)?.card?.hidden && this.getElementBelow(rowIndex, colIndex)?.card?.id,
                        !this.getElementLeft(rowIndex, colIndex)?.card?.hidden && this.getElementLeft(rowIndex, colIndex)?.card?.id,
                        !this.getElementRight(rowIndex, colIndex)?.card?.hidden && this.getElementRight(rowIndex, colIndex)?.card?.id,
                    ];
                    element.card.adjacentCardsRules.forEach(rule => {
                        rule.adjacentCard.forEach((cardToFind: number) => {
                            if(cardToFind == 1) {
                                if (adjacentCardIds.includes(1) || adjacentCardIds.includes(11) ) {
                                    sum += rule.adjacentCardValue
                                 }
                            } else {
                                if (adjacentCardIds.includes(cardToFind)) {
                                    sum += rule.adjacentCardValue
                                 }
                            }
                            
                        });
                        
                    });
                }
            });
        });
    
        return sum;
    }


    computeCardsSum() : number {
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

    computeReynie(): number {
        return this.reynieActivated ? this.getPoison() * -3 : 0;
    }

    computeByDifferentMetiers(): number {
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

    
    computeByDifferentTypes(): number {
        let sum = 0 ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden && element.card.countByAllTypes) {
                    let typesTable = [];
                    typesTable.push(this.getNobles());
                    typesTable.push(this.getErudits());
                    typesTable.push(this.getClerge());
                    typesTable.push(this.getFavorite());
                    typesTable.push(this.getPoison());
                    typesTable.push(this.getMillitaire());
                    typesTable.push(this.getHommedEtat());
                    typesTable = typesTable.filter((val )=> val !=0);
                    if(typesTable.length == 7) {
                       sum += element.card.countByAllTypes; 
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

    computeCardsIfLeft() : number {
        let sumLeft = 0 ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden && element.isLeft) {
                    sumLeft += element.card.ifLeftValue || 0;
                }
            });
        });
        return sumLeft;
    }

    
    computeCardsIfRight() : number {
        let sumRight = 0 ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden && element.isRight) {
                    sumRight += element.card.ifRightValue || 0;
                }
            });
        });
        return sumRight;
    }

    computeCardsIfBottom() : number {
        let sumBottom = 0 ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden && element.isBottom) {
                    sumBottom += element.card.ifBottomValue || 0;
                }
            });
        });
        return sumBottom;
    }


    computeCardsIfExt() : number {
        let sumExt = 0 ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden && element.card.ifExtValue && (element.isTop ||  element.isBottom || element.isRight || element.isLeft)) {
                    sumExt += element.card.ifExtValue || 0;
                }
            });
        });
        return sumExt;
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
                                if(otherCard == 1) {
                                    return this.tableau.some(row2 => 
                                        row2.some(element2 => 
                                            (element2.card?.id === 1 || element2.card?.id == 11) && !element2.card?.hidden));
                                } else {
                                    return this.tableau.some(row2 => 
                                        row2.some(element2 => 
                                            element2.card?.id === otherCard && !element2.card?.hidden));
                                }
                               
                            });
            
                            if (othercardFound) {
                                if(card.id == 4 && (rule.ifOtherCards.includes(1) || rule.ifOtherCards.includes(11)) && this.getFavorite() > 1) {
                                    sumCardsIfOtherCards += 0;
                                    console.log('count');
                                } else {
                                    sumCardsIfOtherCards += rule.ifOtherCardsValue || 0;
                                }
                            }
                        }
                    });
                }
    
                
            });
        });
    
        return sumCardsIfOtherCards;
    }

    isPresent(id: number) {
        return this.tableau.some(row => 
            row.some(tile => 
                tile.card?.id === id && !tile.card?.hidden));
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
