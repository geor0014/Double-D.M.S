export default class GameItem {
    img;
    xPos;
    yPos;
    constructor(imageSrc, maxX, maxY) {
        this.img = GameItem.loadNewImage(imageSrc);
        this.xPos = GameItem.randomNumber(0, maxX);
        this.yPos = GameItem.randomNumber(0, maxY);
    }
    getImageHeight() {
        return this.img.height;
    }
    getImageWidth() {
        return this.img.width;
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
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
//# sourceMappingURL=GameItem.js.map