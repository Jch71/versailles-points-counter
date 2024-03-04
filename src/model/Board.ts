import type Card from "./Card";
import Tile from "./Tile";

export default class Board {

    private tableau: Tile[][];
    public reynieActivated: boolean = false;
    public louisActivated: boolean = false;
    public bonus3: boolean = false;
    public bonusMoins3 : boolean = false;
    public bonus7: boolean = false;
    public bonusMoins7 : boolean = false;
  
    constructor() {

        const hautGauche : Tile= new Tile(true, false, false, true); 
        const hautMilieu : Tile= new Tile( true, false, false, false);
        const hautDroite : Tile= new Tile(true, true, false, false);

        
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

    reset() {

        this.reynieActivated = false;
        this.louisActivated = false;
        this.bonus3 = false;
        this.bonus7 = false;
        this.bonusMoins3 = false;
        this.bonusMoins7 = false;

        let count = 0;
        this.tableau.forEach(row => {
            row.forEach(element => {
                element.card = undefined;
                element.inputValue = undefined;
            });
        });
        
        
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

    getEffects(): number {
        return this.countCardsByType("hasEffect");
    }

    getArchitectes(): number {
        return this.countCardsByType("isArchitecte");
    }

    getFemmes(): number {
        return this.countCardsByType("isFemme");
    }

    getPaintedByHyacinthe(): number {
        return this.countCardsByType("paintedByHyacinthe");
    }

    getEcrivains(): number {
        let sumEcrivain = this.countCardsByType("isEcrivain") ;

        if(this.isPresent(20) && this.isPresent(21)) {
            sumEcrivain+=2;
        }
        if(this.isPresent(33) && this.isPresent(5)) {
            sumEcrivain+=1;
        }

        if(this.isPresent(36)){
            this.tableau.forEach((row, rowIndex) => {
                row.forEach((element, colIndex) => {
       
                    if (element.card && !element.card.hidden && element.card.id == 36) {
                       
                        const adjacentCardIds = [
                            !this.getElementAbove(rowIndex, colIndex)?.card?.hidden && this.getElementAbove(rowIndex, colIndex)?.card?.id,
                            !this.getElementBelow(rowIndex, colIndex)?.card?.hidden && this.getElementBelow(rowIndex, colIndex)?.card?.id,
                            !this.getElementLeft(rowIndex, colIndex)?.card?.hidden && this.getElementLeft(rowIndex, colIndex)?.card?.id,
                            !this.getElementRight(rowIndex, colIndex)?.card?.hidden && this.getElementRight(rowIndex, colIndex)?.card?.id,
                        ];
                        if (adjacentCardIds.includes(40) ) {
                            sumEcrivain += 4
                         }     
                    }
                });
            });
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

        let sumPoison = 0;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if (element.card && !element.card.hidden && element.card.isPoison && !element.card.poisonHidden) {
                    sumPoison++;
                }
            });
        });

        if(this.isPresent(58)) {
            sumPoison += 2;
        }
        return sumPoison;
    }

    getFavorite(): number {
        return this.countCardsByType("isFavorite");
    }

    getMillitaire(): number {
        let sumMillitaire = this.countCardsByType("isMillitaire") ;
        if(this.isPresent(14)) {
            sumMillitaire += 2;
        }
        if(this.isPresent(37)) {
            sumMillitaire += 1;
        } 
        if(this.louisActivated) {
            sumMillitaire += 1;
        }

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
       this.switchPoison();
       this.switchNegative();
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
       cardsValue += this.computeCardsByZero();
       cardsValue += this.computeAdjacentCards();
       cardsValue += this.computeCardsByClerge();
       cardsValue += this.computeCardsByEcrivain();
       cardsValue += this.computeCardsByPaintedByHyacinthe();
       cardsValue += this.computeCardsByPoison();
       cardsValue += this.computeCardsByHidden();
       cardsValue += this.computeByDifferentTypes();
       cardsValue += this.computeEffects();
       cardsValue += this.computeLaFayette();
       cardsValue += this.computeColumns();
       cardsValue += this.computeReynie();
       cardsValue += this.computeBonusMilitaire();
       return cardsValue;
    }

    computeEffects(): number {
        if(this.isPresent(48)) {
            return Math.floor(this.getEffects()/2) * 3
        }
       return 0; 
    }

    computeBonusMilitaire(): number {
        if(this.bonus3) {
           return 3;
        }
        if(this.bonus7) {
            return 7;
         }
         if(this.bonusMoins3) {
            return -3;
         }
         if(this.bonusMoins7) {
            return -7;
         }
       return 0; 
    }

    computeColumns(): number {
        let sum = 0;
        if(this.isPresent(45)) {
            if (this.isColumnNoble(0)) {
                sum += 3;
            }
            
            if (this.isColumnNoble(1)) {
                sum += 3;
            }
            
            if (this.isColumnNoble(2)) {
                sum += 3;
            }
        }
       return sum; 
    }

    isColumnNoble(column: number) {
        return (
            this.getElement(0, column)?.card?.isNoble &&
            !this.getElement(0, column)?.card?.hidden &&
            this.getElement(1, column)?.card?.isNoble &&
            !this.getElement(1, column)?.card?.hidden &&
            this.getElement(2, column)?.card?.isNoble && 
            !this.getElement(2, column)?.card?.hidden 
        );
    }
    
   


    switchPoison() {
        if (this.isPresent(52)) {
            this.tableau.forEach((row, rowIndex) => {
                row.forEach((element, colIndex) => {
       
                    if (element.card && !element.card.hidden && element.card.id == 52) {
                       let elemAbove = this.getElementAbove(rowIndex, colIndex)
                       let elemBelow = this.getElementBelow(rowIndex, colIndex)
                       let elemLeft = this.getElementLeft(rowIndex, colIndex)
                       let elemRight = this.getElementRight(rowIndex, colIndex)
                        if(elemAbove?.card != undefined )
                            elemAbove.card.poisonHidden = true;
                        if(elemBelow?.card != undefined )
                            elemBelow.card.poisonHidden = true;
                        if(elemLeft?.card != undefined )
                            elemLeft.card.poisonHidden = true;
                        if(elemRight?.card != undefined )
                            elemRight.card.poisonHidden = true;
                    }
                });
            });
        } else {
            this.tableau.forEach((row, rowIndex) => {
                row.forEach((element, colIndex) => {
                    if(element.card) {
                        element.card.poisonHidden = false;
                    }
                })})
        }
    }

    switchNegative() {
        if (this.isPresent(53)) {
            this.tableau.forEach((row, rowIndex) => {
                row.forEach((element, colIndex) => {
       
                    if (element.card && !element.card.hidden && element.card.id == 53) {
                       let elemAbove = this.getElementAbove(rowIndex, colIndex)
                       let elemBelow = this.getElementBelow(rowIndex, colIndex)
                       let elemLeft = this.getElementLeft(rowIndex, colIndex)
                       let elemRight = this.getElementRight(rowIndex, colIndex)
                        if(elemAbove?.card != undefined )
                            elemAbove.card.negativeHidden = true;
                        if(elemBelow?.card != undefined )
                            elemBelow.card.negativeHidden = true;
                        if(elemLeft?.card != undefined )
                            elemLeft.card.negativeHidden = true;
                        if(elemRight?.card != undefined )
                            elemRight.card.negativeHidden = true;
                    }
                });
            });
        } else {
            this.tableau.forEach((row) => {
                row.forEach((element) => {
                    if(element.card) {
                        element.card.negativeHidden = false;
                    }
                })})
        }
    }
    
    computeLaFayette(): number {
        if(this.isPresent(40)) {
            return Math.min(this.getEcrivains(), this.getNobles());
        } 
        return 0;
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
        return this.computeCardsByCriterion('pointsByFemme', () => this.getFemmes() - 1);
    }
    
    computeCardsByEcrivain(): number {
        return this.computeCardsByCriterion('pointsByEcrivain', () => this.getEcrivains()); 
    }

    computeCardsByPaintedByHyacinthe(): number {
        return this.computeCardsByCriterion('pointsByPaintedByHyacinthe', () => this.getPaintedByHyacinthe() - 1);
    }
    

    computeCardsByPoison(): number {
        return this.computeCardsByCriterion('pointsByPoison', () => this.getPoison()); 
    }

    computeCardsByZero(): number {
        let sum = 0;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if (element.card && !element.card.hidden && element.card.pointsByZero) {
                    sum += element.card.pointsByZero * this.getZero();
                }
            });
        });
        return sum;
    }

    getZero(): number {
        let count = 0;
        this.tableau.forEach(row => {
            row.forEach(element => {
                if (element.card && !element.card.hidden && element.card.value == 0) {
                    count++;
                }
            });
        });
        return count;
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
                    sum += element.card.negativeHidden ? Math.abs(element.card.value || 0): element.card.value || 0;
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
                                            (element2.card?.id === 1 || (element2.card?.id == 11 && card.id != 10)) && !element2.card?.hidden));
                                } else {
                                    return this.tableau.some(row2 => 
                                        row2.some(element2 => 
                                            element2.card?.id === otherCard && !element2.card?.hidden));
                                }
                               
                            });
            
                            if (othercardFound) {
                                if(card.id == 4 && (rule.ifOtherCards.includes(1) || rule.ifOtherCards.includes(11)) && this.getFavorite() > 1) {
                                    sumCardsIfOtherCards += 0;
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
