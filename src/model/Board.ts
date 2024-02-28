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
                if(element.card && element.card.isErudit) {
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
                if(element.card && element.card.isNoble) {
                    numberNobles ++;
                }
            });
        });
        return numberNobles;
    }

    getScore() : number {
        
       let cardsValue:number = 0;
       cardsValue += this.computeCardsSum();
       cardsValue += this.computeCardsIfTop();
       cardsValue += this.computeCardIfOtherCard();
       return cardsValue;
    }

    computeCardsSum(): number {
        let sum = 0 ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card) {
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
                if(element.card && element.isTop) {
                    sumTop += element.card.ifTopValue || 0;
                }
            });
        });
        return sumTop;
    }

    computeCardIfOtherCard() : number {
        let sumCardsIfOtherCards = 0 ;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if(element.card && element.card.ifOtherCard != -1) {
                    this.tableau.forEach(row2 => {
                        row2.forEach(element2 => {
                            if(element2.card && element2.card.id === element?.card?.ifOtherCard) {
                                sumCardsIfOtherCards += element?.card?.ifOtherCardValue || 0;
                            }
                        })
                    })
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
