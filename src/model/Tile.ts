import type Card from "./Card";

export default class Tile {

    public isLeft: boolean = false;
    public isRight: boolean = false;
    public isTop: boolean = false;
    public isBottom: boolean = false;
    public card?: Card;
    public inputValue?: number;

    constructor(isTop?: boolean, isRight?: boolean, isBottom?: boolean, isLeft?: boolean, card?: Card) {
        this.isTop = isTop || false;
        this.isRight = isRight || false;
        this.isBottom = isBottom || false;
        this.isLeft = isLeft || false;
        this.card = card || undefined;
    }
}