export default class Card {

    public id?: number;
    public hidden : boolean = false;
    public name?: string;
    public value?: number = 0;
    public ifTopValue?: number = 0;
    public ifMiddleValue?: number = 0;
    public otherCardsRules: any[] = [];
    public ifOtherCards?: number[] = [];
    public ifOtherCardsValue?: number = 0;
    public isErudit: boolean = false;
    public isNoble: boolean = false;
    public isFavorite: boolean = false;
    public isPoison: boolean = false;
    public isMillitaire: boolean = false;
    public ifAdjacentNobleBonus: number= 0;
    public ifAdjacentEruditBonus: number= 0;
    public isPeintre: boolean=false;
    public isArchitecte: boolean=false;
    public isJardinier: boolean=false;
    public isEcrivain: boolean=false;
    public isMusicien: boolean=false;
    public countByMetiers: boolean=false;
    public isHommedEtat: boolean = false;
    public isClerge: boolean = false;
    public pointsByFavorite: number = 0;



    constructor(cardObject: any) {
        if(cardObject) {
            this.id=cardObject.id;
            this.name=cardObject.name;
            this.value = cardObject.value;
            this.ifTopValue = cardObject.ifTopValue;
            this.ifOtherCards = cardObject.ifOtherCards;
            this.ifOtherCardsValue = cardObject.ifOtherCardsValue;
            this.isErudit = cardObject.isErudit;
            this.isNoble = cardObject.isNoble;
            this.ifAdjacentNobleBonus = cardObject.ifAdjacentNobleBonus; 
            this.ifAdjacentEruditBonus = cardObject.ifAdjacentEruditBonus; 
            this.isPeintre =cardObject.isPeintre;
            this.isArchitecte =cardObject.isArchitecte;
            this.isJardinier =cardObject.isJardinier;
            this.isEcrivain =cardObject.isEcrivain;
            this.isPoison =cardObject.isPoison;
            this.isMillitaire =cardObject.isMillitaire;
            this.isFavorite =cardObject.isFavorite;
            this.isMusicien =cardObject.isMusicien;
            this.countByMetiers =cardObject.countByMetiers;
            this.isHommedEtat =cardObject.isHommedEtat;
            this.isClerge =cardObject.isClerge;
            this.ifMiddleValue =cardObject.ifMiddleValue;
            this.pointsByFavorite =cardObject.pointsByFavorite;
            this.otherCardsRules =cardObject.otherCardsRules;
        }    
    } 

}