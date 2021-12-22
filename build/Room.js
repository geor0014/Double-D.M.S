import Scene from './Scene.js';
import Player from './Player.js';
import Candy from './Candy.js';
export default class Room extends Scene {
    xPos;
    yPos;
    img;
    imageWidth;
    imageHeight;
    player;
    candies = [];
    constructor(canvas, imgSrc) {
        super(canvas);
        this.img = new Image();
        this.img.src = imgSrc;
        this.candies.push(new Candy(this.canvas.width / 2, this.canvas.height / 2));
        this.player = new Player(this.canvas);
        console.log(this.img.width);
    }
    getXPos() {
        return this.xPos;
    }
    setXPos(newPos) {
        this.xPos = newPos;
    }
    getYPos() {
        return this.yPos;
    }
    setYPos(newPos) {
        this.yPos = newPos;
    }
    getImgHeight() {
        return this.img.height;
    }
    setImgHeight(newHeight) {
        this.imageHeight = newHeight;
    }
    setImgWidth(newWidth) {
        this.imageWidth = newWidth;
    }
    getImgWidth() {
        return this.img.width;
    }
    processInput() {
        this.player.movePlayer(this.canvas);
    }
    catchingCandy() {
        this.candies = this.candies.filter((element) => {
            if (this.player.collidesWith(element) && element instanceof Candy) {
                return false;
            }
            return true;
        });
    }
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.player.getXPos() >= this.xPos
            && this.player.getXPos() <= this.xPos + this.imageWidth
            && this.player.getYPos() >= this.yPos
            && this.player.getYPos() <= this.yPos + this.imageHeight) {
            this.processInput();
        }
        if (this.player.isInteracting()) {
            this.catchingCandy();
        }
        return null;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.xPos, this.yPos, this.imageWidth, this.imageHeight);
    }
    render() {
        this.draw(this.ctx);
        for (let i = 0; i < this.candies.length; i++) {
            this.candies[i].draw(this.ctx);
        }
        this.player.draw(this.ctx);
    }
}
//# sourceMappingURL=Room.js.map