import Tile from "./Tile";

export default class Board {

    private tableau: Tile[][];
  
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

    getErudits() {
        let numberErudits = 0 ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden && element.card.isErudit) {
                    numberErudits ++;
                }
            });
        });
        return numberErudits;
    }

    getNobles() {
        let numberNobles = 0 ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden && element.card.isNoble) {
                    numberNobles ++;
                }
            });
        });
        return numberNobles;
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

    getScore() : number {
        
       let cardsValue:number = 0;
       cardsValue += this.computeCardsSum();
       cardsValue += this.computeCardsIfTop();
       cardsValue += this.computeCardIfOtherCards();
       cardsValue += this.computeAdjacentNobles();
       return cardsValue;
    }

    computeCardsSum(): number {
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

  
    computeCardIfOtherCards() : number {
        let sumCardsIfOtherCards = 0 ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && !element.card.hidden && element.card.ifOtherCards?.length) {
                    let othercardFound = [];
                    element.card.ifOtherCards.forEach(otherCard => {
                        this.tableau.forEach(row2 => {
                            row2.forEach(element2 => {
                                if(element2.card && !element2.card.hidden && element2.card.id === otherCard) {
                                        othercardFound.push(element2.card.id);
                                }
                            })
                        })
                    });
                    if(element?.card?.ifOtherCards && othercardFound.length >= element?.card?.ifOtherCards?.length){
                        sumCardsIfOtherCards += element?.card?.ifOtherCardsValue || 0;
                    }  
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
