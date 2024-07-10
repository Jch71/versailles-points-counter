export default class Card {

    public id?: number;
    public hidden : boolean = false;
    public hasEffect: boolean = false;
    public name?: string;
    public value?: number = 0;
    public ifLeftValue?: number = 0;
    public ifRightValue?: number = 0;
    public ifBottomValue?: number = 0;
    public ifTopValue?: number = 0;
    public ifExtValue?: number = 0;
    public ifMiddleValue?: number = 0;
    public otherCardsRules: any[] = [];
    public adjacentCardsRules: any[] = [];
    public ifOtherCards?: number[] = [];
    public ifOtherCardsValue?: number = 0;
    public isFemme: boolean = false;
    public isHomme: boolean = false;
    public isErudit: boolean = false;
    public isNoble: boolean = false;
    public isFavorite: boolean = false;
    public isPoison: boolean = false;
    public poisonHidden: boolean = false;
    public negativeHidden: boolean = false;
    public isMillitaire: boolean = false;
    public ifAdjacentNobleBonus: number= 0;
    public ifAdjacentEruditBonus: number= 0;
    public ifAdjacentHommedEtatBonus: number= 0;
    public isPeintre: boolean=false;
    public isArchitecte: boolean=false;
    public isJardinier: boolean=false;
    public isEcrivain: boolean=false;
    public isMusicien: boolean=false;
    public isSculpteur: boolean=false;
    public countByMetiers: boolean=false;
    public paintedByHyacinthe: boolean = false;
    public countByAllTypes: number= 0;
    public isHommedEtat: boolean = false;
    public isClerge: boolean = false;
    public pointsByFavorite: number = 0;
    public pointsByClerge: number = 0;
    public pointsByPaintedByHyacinthe: number = 0;
    public pointsByEcrivain: number = 0;
    public pointsByPoison: number = 0 ;
    public pointsByHidden: number = 0;
    public pointsByFemme: number = 0;
    public pointsByZero: number = 0;
    public cardValue: number = 0;


    constructor(cardObject: any) {
        if(cardObject) {
            this.id=cardObject.id;
            this.name=cardObject.name;
            this.hasEffect = cardObject.hasEffect;
            this.value = cardObject.value;
            this.ifTopValue = cardObject.ifTopValue;
            this.ifLeftValue = cardObject.ifLeftValue;
            this.ifRightValue = cardObject.ifRightValue;
            this.ifBottomValue = cardObject.ifBottomValue;
            this.ifExtValue = cardObject.ifExtValue;
            this.ifOtherCards = cardObject.ifOtherCards;
            this.ifOtherCardsValue = cardObject.ifOtherCardsValue;
            this.isErudit = cardObject.isErudit;
            this.isNoble = cardObject.isNoble;
            this.ifAdjacentNobleBonus = cardObject.ifAdjacentNobleBonus; 
            this.ifAdjacentEruditBonus = cardObject.ifAdjacentEruditBonus; 
            this.ifAdjacentHommedEtatBonus = cardObject.ifAdjacentHommedEtatBonus; 
            this.isPeintre =cardObject.isPeintre;
            this.isArchitecte =cardObject.isArchitecte;
            this.isJardinier =cardObject.isJardinier;
            this.isEcrivain =cardObject.isEcrivain;
            this.isSculpteur=cardObject.isSculpteur;
            this.isPoison =cardObject.isPoison;
            this.poisonHidden = cardObject.poisonHidden;
            this.negativeHidden = cardObject.negativeHidden;
            this.isMillitaire =cardObject.isMillitaire;
            this.isFavorite =cardObject.isFavorite;
            this.isMusicien =cardObject.isMusicien;
            this.countByMetiers =cardObject.countByMetiers;
            this.isHommedEtat =cardObject.isHommedEtat;
            this.isClerge =cardObject.isClerge;
            this.ifMiddleValue =cardObject.ifMiddleValue;
            this.pointsByFavorite =cardObject.pointsByFavorite;
            this.pointsByClerge =cardObject.pointsByClerge;
            this.pointsByEcrivain =cardObject.pointsByEcrivain;
            this.pointsByPoison =cardObject.pointsByPoison;
            this.pointsByHidden =cardObject.pointsByHidden;
            this.pointsByZero =cardObject.pointsByZero;
            this.pointsByFemme =cardObject.pointsByFemme;
            this.otherCardsRules =cardObject.otherCardsRules;
            this.adjacentCardsRules =cardObject.adjacentCardsRules;
            this.isFemme =cardObject.isFemme;
            this.isHomme =cardObject.isHomme;
            this.countByAllTypes =cardObject.countByAllTypes;
            this.paintedByHyacinthe =cardObject.paintedByHyacinthe;
            this.pointsByPaintedByHyacinthe =cardObject.pointsByPaintedByHyacinthe;

        }    
    } 

}