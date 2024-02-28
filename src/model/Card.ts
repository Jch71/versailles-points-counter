export default class Card {

    public id?: number;
    public name?: string;
    public value?: number = 0;
    public ifTopValue?: number = 0;
    public ifOtherCard?: number = -1;
    public ifOtherCardValue?: number = 0;
    public isErudit: boolean = false;
    public isNoble: boolean = false;

    constructor(cardObject: any) {
        if(cardObject) {
            this.id=cardObject.id;
            this.name=cardObject.name;
            this.value = cardObject.value;
            this.ifTopValue = cardObject.ifTopValue;
            this.ifOtherCard = cardObject.ifOtherCard;
            this.ifOtherCardValue = cardObject.ifOtherCardValue;
            this.isErudit = cardObject.isErudit;
            this.isNoble = cardObject.isNoble;
        }    
    } 

}