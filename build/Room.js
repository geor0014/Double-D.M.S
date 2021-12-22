import Scene from './Scene.js';
import Player from './Player.js';
import Candy from './Candy.js';
import Npc from './Npc.js';
import Hint from './Hint.js';
import Door from './Door.js';
export default class Room extends Scene {
    player;
    xPos;
    yPos;
    img;
    imageWidth;
    imageHeight;
    collectibles = [];
    npcs = [];
    doors = [];
    constructor(canvas, imgSrc) {
        super(canvas);
        this.img = new Image();
        this.img.src = imgSrc;
        this.collectibles.push(new Candy(this.canvas.width / 2, this.canvas.height / 2));
        this.collectibles.push(new Hint(this.canvas.width / 3, this.canvas.height / 1.5));
        this.doors.push(new Door('./assets/img/door1.png', this.canvas.width / 2 - 20, this.canvas.height / 2 - 100));
        this.npcs.push(new Npc('./assets/img/teacher-front.png', (this.canvas.width / 2 - 50), (this.canvas.height - 350)));
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
    collectCollectibles() {
        this.collectibles = this.collectibles.filter((element) => {
            if (this.player.collidesWith(element) && element instanceof Candy) {
                return false;
            }
            if (this.player.collidesWith(element) && element instanceof Hint) {
                return false;
            }
            return true;
        });
    }
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.player.isInteracting()) {
            this.collectCollectibles();
        }
        return null;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.xPos, this.yPos, this.imageWidth, this.imageHeight);
    }
    render() {
        this.draw(this.ctx);
        for (let i = 0; i < this.collectibles.length; i++) {
            this.collectibles[i].draw(this.ctx);
        }
        for (let i = 0; i < this.npcs.length; i += 1) {
            this.npcs[i].draw(this.ctx);
        }
        for (let i = 0; i < this.doors.length; i += 1) {
            this.doors[i].draw(this.ctx);
        }
        this.player.draw(this.ctx);
    }
}
//# sourceMappingURL=Room.js.map