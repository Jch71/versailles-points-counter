export default class Card {

    public id?: number;
    public hidden : boolean = false;
    public name?: string;
    public value?: number = 0;
    public ifTopValue?: number = 0;
    public ifOtherCards?: number[] = [];
    public ifOtherCardsValue?: number = 0;
    public isErudit: boolean = false;
    public isNoble: boolean = false;
    public ifAdjacentNobleBonus: number= 0;

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
        }    
    } 

}