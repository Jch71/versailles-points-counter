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
    public fenelonResource : any = {};
    public brinvilliersClerge: boolean = false;
    public brinvilliersPoison: boolean = false;
  
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
       let sumErudit = this.isPresent(43) &&  this.fenelonResource['erudit']? 1 : 0;
        return sumErudit += this.countCardsByType("isErudit");
    }

    getJardiniers(): number {
        return this.countCardsByType("isJardinier");
    }

    getPeintres(): number {
        return this.countCardsByType("isPeintre");
    }

    getSculpteurs(): number {
        return this.countCardsByType("isSculpteur");
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

    getHommes(): number {
        return  this.countCardsByType("isHomme");
    }

    getEclairs(): number {
        return this.countCardsByType("hasEffect");
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
                    element.card.id === 58 ? sumPoison+=3 : sumPoison+=1;
                }
            });
        });

        sumPoison+= this.brinvilliersPoison ? 2 : 0;

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
        let sumClerge = this.isPresent(43) &&  this.fenelonResource['clerge']? 1 : 0;
        sumClerge += this.brinvilliersClerge ? 2 : 0;
        return sumClerge += this.countCardsByType("isClerge");
    }

    
    computeAdjacentHommedEtat(tile: Tile, rowIndex: number, colIndex: number) {
        let sumAdjacentHommedEtat = 0 ;

                if(tile.card && !tile.card.hidden && tile.card.ifAdjacentHommedEtatBonus) {
                   if(!this.getElementAbove(rowIndex, colIndex)?.card?.hidden && this.getElementAbove(rowIndex, colIndex)?.card?.isHommedEtat) {
                        sumAdjacentHommedEtat+=tile.card.ifAdjacentHommedEtatBonus;}
                   if(!this.getElementBelow(rowIndex, colIndex)?.card?.hidden && this.getElementBelow(rowIndex, colIndex)?.card?.isHommedEtat) {
                        sumAdjacentHommedEtat+=tile.card.ifAdjacentHommedEtatBonus;}
                   if(!this.getElementLeft(rowIndex, colIndex)?.card?.hidden && this.getElementLeft(rowIndex, colIndex)?.card?.isHommedEtat) {
                        sumAdjacentHommedEtat+=tile.card.ifAdjacentHommedEtatBonus;}
                   if(!this.getElementRight(rowIndex, colIndex)?.card?.hidden && this.getElementRight(rowIndex, colIndex)?.card?.isHommedEtat) 
                        sumAdjacentHommedEtat+=tile.card.ifAdjacentHommedEtatBonus;
                }

        return sumAdjacentHommedEtat;
    }

    computeAdjacentNobles(tile: Tile, rowIndex: number, colIndex: number) {
        let sumAdjacentNobles = 0 ;
       
                if(tile.card && !tile.card.hidden && tile.card.ifAdjacentNobleBonus) {
                   if(!this.getElementAbove(rowIndex, colIndex)?.card?.hidden && this.getElementAbove(rowIndex, colIndex)?.card?.isNoble) {
                        sumAdjacentNobles+=tile.card.ifAdjacentNobleBonus;}
                   if(!this.getElementBelow(rowIndex, colIndex)?.card?.hidden && this.getElementBelow(rowIndex, colIndex)?.card?.isNoble) {
                        sumAdjacentNobles+=tile.card.ifAdjacentNobleBonus;}
                   if(!this.getElementLeft(rowIndex, colIndex)?.card?.hidden && this.getElementLeft(rowIndex, colIndex)?.card?.isNoble) {
                        sumAdjacentNobles+=tile.card.ifAdjacentNobleBonus;}
                   if(!this.getElementRight(rowIndex, colIndex)?.card?.hidden && this.getElementRight(rowIndex, colIndex)?.card?.isNoble) 
                        sumAdjacentNobles+=tile.card.ifAdjacentNobleBonus;
                }
        return sumAdjacentNobles;
    }


    computeAdjacentErudits(tile: Tile, rowIndex: number, colIndex: number) {
        let sumAdjacentErudits = 0 ;

        if(tile.card && !tile.card.hidden && tile.card.ifAdjacentEruditBonus) {
            if(!this.getElementAbove(rowIndex, colIndex)?.card?.hidden && this.getElementAbove(rowIndex, colIndex)?.card?.isErudit) {
                sumAdjacentErudits+=tile.card.ifAdjacentEruditBonus;}
            if(!this.getElementBelow(rowIndex, colIndex)?.card?.hidden && this.getElementBelow(rowIndex, colIndex)?.card?.isErudit) {
                sumAdjacentErudits+=tile.card.ifAdjacentEruditBonus;}
            if(!this.getElementLeft(rowIndex, colIndex)?.card?.hidden && this.getElementLeft(rowIndex, colIndex)?.card?.isErudit) {
                sumAdjacentErudits+=tile.card.ifAdjacentEruditBonus;}
            if(!this.getElementRight(rowIndex, colIndex)?.card?.hidden && this.getElementRight(rowIndex, colIndex)?.card?.isErudit) 
                sumAdjacentErudits+=tile.card.ifAdjacentEruditBonus;
        } if(tile.card && !tile.card.hidden && tile.card.id == 38) {
            if((!this.getElementAbove(rowIndex, colIndex)?.card?.hidden && this.getElementAbove(rowIndex, colIndex)?.card?.isErudit) || 
                (!this.getElementBelow(rowIndex, colIndex)?.card?.hidden && this.getElementBelow(rowIndex, colIndex)?.card?.isErudit) || 
                (!this.getElementLeft(rowIndex, colIndex)?.card?.hidden && this.getElementLeft(rowIndex, colIndex)?.card?.isErudit) || 
                (!this.getElementRight(rowIndex, colIndex)?.card?.hidden && this.getElementRight(rowIndex, colIndex)?.card?.isErudit)) {
                    sumAdjacentErudits+=3;
                }
        }

        
        return sumAdjacentErudits;
    }
    

    getScore() : number {

       let cardsValue:number = 0;
       this.switchPoison();
       this.switchNegative();


        this.tableau.forEach((row, rowIndex) => {
            row.forEach((tile, colIndex) => { 
                if(tile.card && !tile.card.hidden){
                    let cardSum = 0;
                    cardSum += this.computeCardsSum(tile);
                    cardSum += this.computeCardsIfTop(tile);
                    cardSum += this.computeCardsIfLeft(tile);
                    cardSum += this.computeCardsIfRight(tile);
                    cardSum += this.computeCardsIfBottom(tile);
                    cardSum += this.computeCardsIfMiddle(tile);
                    cardSum += this.computeCardsIfExt(tile);
                    cardSum += this.computeCardIfOtherCards(tile);
                    cardSum += this.computeAdjacentNobles(tile, rowIndex, colIndex);
                    cardSum += this.computeAdjacentHommedEtat(tile, rowIndex, colIndex);
                    cardSum += this.computeAdjacentErudits(tile, rowIndex, colIndex);
                    cardSum += this.computeByDifferentMetiers(tile);
                    cardSum += this.computeCardsByFavorite(tile);
                    cardSum += this.computeCardsByFemme(tile);
                    cardSum += this.computeCardsByZero(tile);
                    cardSum += this.computeAdjacentCards(tile, rowIndex, colIndex);
                    cardSum += this.computeCardsByClerge(tile);
                    cardSum += this.computeCardsByEcrivain(tile);
                    cardSum += this.computeCardsByPaintedByHyacinthe(tile);
                    cardSum += this.computeCardsByPoison(tile);
                    cardSum += this.computeCardsByHidden(tile);
                    cardSum += this.computeByDifferentTypes(tile);
                    cardSum += this.computeEffects(tile);
                    cardSum += this.computeMillitairePairs(tile);
                    cardSum += this.computeValliere(tile);
                    cardSum += this.computeLaFayette(tile);
                    cardSum += this.computeColumns(tile);
                    cardSum += this.computeReynie(tile);

                    tile.card.cardValue = cardSum;

                    cardsValue+=cardSum;
                }
            })
        })

        cardsValue += this.computeBonusMilitaire();

       return cardsValue;
    }

    computeValliere(tile: Tile): number {
        let sumValliere = 0;
        if(tile.card?.id == 63) {
            this.tableau.forEach((row, rowIndex) => {
                row.forEach((element, colIndex) => {
                    if (element.card) {
                        if(!element.card.hidden) {
                            sumValliere += element.card?.isNoble || element.card?.isErudit ? 0 : 2;
                        } else {
                            sumValliere += 2;
                        }
                    } 
                 })
                })
            
        }
       return sumValliere; 
    }

    computeEffects(tile: Tile): number {
        if(tile.card?.id == 65) {
            return Math.floor(this.getMillitaire()/2) * 3
        }
       return 0; 
    }
    
    computeMillitairePairs(tile: Tile): number {
        if(tile.card?.id == 48) {
            return Math.floor(this.getEffects()/2) * 1
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

    computeColumns(tile: Tile): number {
        let sum = 0;
        if(tile.card?.id == 45) {
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
    
    computeLaFayette(tile:Tile): number {
        if(tile.card!.id === 40) {
            return Math.min(this.getEcrivains(), this.getNobles());
        } 
        return 0;
    }

    
    computeCardsByHidden(tile: Tile): number {
        let sum = 0;
        
        if (tile.card && !tile.card.hidden && tile.card.pointsByHidden) {
            sum += this.getHidden() *  tile.card.pointsByHidden;
        }
                
        return sum;
    }

    computeCardsByCriterion(tile: Tile, property: string, getMultiplier: () => number): number {
        let sum = 0;
       
        if (tile.card && !tile.card.hidden && tile.card[property as keyof Card]) {
            let number: number = tile.card[property as keyof Card] as number || 0
            sum += getMultiplier() * number;
        }
        return sum;
    }
    
    computeCardsByFavorite(tile: Tile): number {
        return this.computeCardsByCriterion(tile, 'pointsByFavorite', () => this.getFavorite());
    }
    
    computeCardsByClerge(tile: Tile): number {
        return this.computeCardsByCriterion(tile, 'pointsByClerge', () => this.getClerge());
    }

    computeCardsByFemme(tile: Tile): number {
        return this.computeCardsByCriterion(tile, 'pointsByFemme', () => this.getFemmes() - 1);
    }
    
    computeCardsByEcrivain(tile: Tile): number {
        return this.computeCardsByCriterion(tile, 'pointsByEcrivain', () => this.getEcrivains()); 
    }

    computeCardsByPaintedByHyacinthe(tile: Tile): number {
        return this.computeCardsByCriterion(tile, 'pointsByPaintedByHyacinthe', () => this.getPaintedByHyacinthe() - 1);
    }
    

    computeCardsByPoison(tile: Tile): number {
        return this.computeCardsByCriterion(tile, 'pointsByPoison', () => this.getPoison()); 
    }

    computeCardsByZero(tile: Tile): number {
        let sum = 0;
        if (tile.card && !tile.card.hidden && tile.card.pointsByZero) {
            sum += tile.card.pointsByZero * this.getZero();
        }
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
    



    computeAdjacentCards(tile:Tile, rowIndex: number, colIndex: number): number {
        let sum = 0;
    
   
        if (tile.card && !tile.card.hidden && tile.card.adjacentCardsRules) {
            
            const adjacentCardIds = [
                !this.getElementAbove(rowIndex, colIndex)?.card?.hidden && this.getElementAbove(rowIndex, colIndex)?.card?.id,
                !this.getElementBelow(rowIndex, colIndex)?.card?.hidden && this.getElementBelow(rowIndex, colIndex)?.card?.id,
                !this.getElementLeft(rowIndex, colIndex)?.card?.hidden && this.getElementLeft(rowIndex, colIndex)?.card?.id,
                !this.getElementRight(rowIndex, colIndex)?.card?.hidden && this.getElementRight(rowIndex, colIndex)?.card?.id,
            ];
            tile.card.adjacentCardsRules.forEach(rule => {
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
    
        return sum;
    }


    computeCardsSum(tile: Tile) : number {
        let leoSum= 0;
        let kingSum = 0;
        if(tile.card?.id == 89) {
            leoSum = 33;
            this.tableau.forEach(row => {
                row.forEach(element => {
                    if(element.card && !element.card.hidden && element.card.id != 89) {
                        leoSum -= Math.abs(element.card.value || 0)
                    }
                });
            });
            return leoSum
        }

        if(tile.card?.id == 70) {
            kingSum = 30;
            this.tableau.forEach(row => {
                row.forEach(element => {
                    if(element.card && !element.card.hidden && element.card.id != 70) {
                        kingSum -= Math.abs(element.card.value || 0)
                    }
                });
            });
            return kingSum
        }

        return tile.card!.negativeHidden ? Math.abs(tile.card!.value || 0): tile.card!.value || 0;
    }

    computeReynie(tile: Tile): number {
        return this.reynieActivated && tile.card?.isPoison && !tile.card?.poisonHidden ? (tile.card?.id === 58 ? -9 : -3) : 0;
    }

    computeByDifferentMetiers(tile: Tile): number {
        let sum = 0 ;
      
        if(tile.card && !tile.card.hidden && tile.card.countByMetiers) {
            let metiersTable = [];
            metiersTable.push(this.getJardiniers());
            metiersTable.push(this.getArchitectes());
            metiersTable.push(this.getEcrivains());
            metiersTable.push(this.getMusiciens());
            metiersTable.push(this.getPeintres());
            metiersTable.push(this.getSculpteurs());
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
                case 6:
                    sum += 8;
                break;
        
                default:
                    break;
            }
        }
        return sum;
    }

    
    computeByDifferentTypes(tile: Tile): number {
        let sum = 0 ;
        if(tile.card && !tile.card.hidden && tile.card.countByAllTypes) {
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
                sum += tile.card.countByAllTypes; 
            }
        }
        return sum;
    }

    
    
    computeCardsIfMiddle(tile: Tile) : number {
        let sumMiddle = 0 ;

        if(!tile.isTop && !tile.isBottom && !tile.isLeft && !tile.isRight) {
            sumMiddle += tile.card!.ifMiddleValue || 0;
        }
        return sumMiddle
    }


    computeCardsIfTop(tile: Tile) : number {
        let sumTop = 0 ;

        if(tile.isTop) {
            sumTop += tile.card!.ifTopValue || 0;
        }
        return sumTop
    }

    computeCardsIfLeft(tile: Tile) : number {
        let sumLeft = 0 ;

        if(tile.isLeft) {
            sumLeft += tile.card!.ifLeftValue || 0;
        }
        return sumLeft;
    }


    computeCardsIfRight(tile: Tile) : number {
        let sumRight = 0 ;

        if(tile.isRight) {
            sumRight += tile.card!.ifRightValue || 0;
        }
        return sumRight;
    }

    computeCardsIfBottom(tile: Tile) : number {
        let sumBottom = 0 ;

        if(tile.isBottom) {
            sumBottom += tile.card!.ifBottomValue || 0;
        }
        return sumBottom;
    }

    computeCardsIfExt(tile: Tile) : number {
        let sumExt = 0 ;
        if( tile.card!.ifExtValue && (tile.isTop ||  tile.isBottom || tile.isRight || tile.isLeft) ) {
            sumExt += tile.card!.ifExtValue || 0;
        }
        return sumExt;
    }

   
    computeCardIfOtherCards(tile: Tile): number {
        let sumCardsIfOtherCards = 0;
        
        const card = tile.card!;

                

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
    
    
        return sumCardsIfOtherCards;
    }

    isPresent(id: number) {
        return this.tableau.some(row => 
            row.some(tile => 
                tile.card?.id === id && !tile.card?.hidden));
    }

    getCardById(id: number) {
        for (let i = 0; i < this.tableau.length; i++) {
            for (let j = 0; j < this.tableau[i].length; j++) {
                if (this.tableau[i][j].card?.id === id && !this.tableau[i][j].card?.hidden) {
                    return this.tableau[i][j].card;
                }
            }
        }
        return null;
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
