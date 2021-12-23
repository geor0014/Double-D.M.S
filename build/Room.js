import Scene from './Scene.js';
import Player from './Player.js';
export default class Room extends Scene {
    xPos;
    yPos;
    img;
    player;
    collectibles;
    npcs;
    doors;
    doorOpen;
    doorClose;
    constructor(canvas, imgSrc) {
        super(canvas);
        console.log(`loading a new image ${imgSrc}`);
        this.img = new Image();
        this.img.src = imgSrc;
        this.player = new Player(this.canvas);
        this.player.setXPos(732);
        this.player.setYPos(535);
        this.doorClose = new Audio('./assets/sound/DoorClose.ogg');
        this.doorOpen = new Audio('./assets/sound/DoorOpen.ogg');
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
    processInput() {
        this.player.movePlayer(this.canvas);
    }
    collectCollectibles() {
        this.collectibles.forEach((item, index) => {
            if (this.player.collidesWith(item)) {
                this.collectibles.splice(index, 1);
            }
        });
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.xPos, this.yPos);
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