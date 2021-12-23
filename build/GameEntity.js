export default class GameEntity {
    img;
    xPos;
    yPos;
    constructor(imageSrc, xPos, yPos) {
        this.img = GameEntity.loadNewImage(imageSrc);
        this.xPos = xPos;
        this.yPos = yPos;
    }
    getImage() {
        return this.img;
    }
    setImage(source) {
        this.img = GameEntity.loadNewImage(source);
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    setXPos(number) {
        this.xPos = number;
    }
    setYPos(number) {
        this.yPos = number;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.xPos, this.yPos);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=GameEntity.js.map