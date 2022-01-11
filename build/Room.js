import Scene from './Scene.js';
import Menu from './Menu.js';
import Candy from './Candy.js';
import Hint from './Hint.js';
export default class Room extends Scene {
    xPos;
    yPos;
    hintNumImg;
    candyNumImg;
    frameCounter = 0;
    img;
    collectibles;
    npcs;
    doors;
    menu;
    isMenuShowing;
    doorOpen;
    doorClose;
    constructor(canvas, imgSrc, state = false) {
        super(canvas);
        this.img = new Image();
        this.img.src = imgSrc;
        this.doorClose = new Audio('./assets/sound/DoorClose.ogg');
        this.doorOpen = new Audio('./assets/sound/DoorOpen.ogg');
        this.menu = new Menu(this.canvas.width / 3 - 30, 600);
        this.isMenuShowing = false;
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
    generalInteraction() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.player.isInteractingMenu() && this.frameCounter === 7) {
            if (this.isMenuShowing === true) {
                this.isMenuShowing = false;
            }
            else if (this.isMenuShowing === false) {
                this.isMenuShowing = true;
            }
        }
        if (this.frameCounter === 7) {
            this.frameCounter = 0;
        }
        if (this.player.isInteracting()) {
            this.collectibles.forEach((item) => {
                if (this.player.collidesWith(item)) {
                    this.collectCollectibles();
                    if (item instanceof Candy) {
                        this.player
                            .getUserData()
                            .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
                        console.log(this.player.getUserData().getCandyAmount());
                    }
                    else if (item instanceof Hint) {
                        this.player
                            .getUserData()
                            .setHintAmount(this.player.getUserData().getHintAmount() + 1);
                        console.log(this.player.getUserData().getHintAmount());
                    }
                }
            });
        }
        this.frameCounter += 1;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.xPos, this.yPos);
    }
    render() {
        for (let i = 0; i < this.collectibles.length; i++) {
            this.collectibles[i].draw(this.ctx);
        }
        for (let i = 0; i < this.npcs.length; i += 1) {
            this.npcs[i].draw(this.ctx);
        }
        for (let i = 0; i < this.doors.length; i += 1) {
            this.doors[i].draw(this.ctx);
        }
        if (this.isMenuShowing) {
            this.menu.draw(this.ctx);
            if (this.player.getUserData().getHintAmount() === 1) {
                this.hintNumImg = Scene.loadNewImage('./assets/img/1.png');
            }
            else if (this.player.getUserData().getHintAmount() === 2) {
                this.hintNumImg = Scene.loadNewImage('./assets/img/2.png');
            }
            else if (this.player.getUserData().getHintAmount() === 3) {
                this.hintNumImg = Scene.loadNewImage('./assets/img/3.png');
            }
            else if (this.player.getUserData().getHintAmount() === 4) {
                this.hintNumImg = Scene.loadNewImage('./assets/img/4.png');
            }
            else if (this.player.getUserData().getHintAmount() === 5) {
                this.hintNumImg = Scene.loadNewImage('./assets/img/5.png');
            }
            else {
                this.hintNumImg = Scene.loadNewImage('./assets/img/0.png');
            }
            if (this.player.getUserData().getCandyAmount() === 1) {
                this.candyNumImg = Scene.loadNewImage('./assets/img/1.png');
            }
            else if (this.player.getUserData().getCandyAmount() === 2) {
                this.candyNumImg = Scene.loadNewImage('./assets/img/2.png');
            }
            else if (this.player.getUserData().getCandyAmount() === 3) {
                this.candyNumImg = Scene.loadNewImage('./assets/img/3.png');
            }
            else if (this.player.getUserData().getCandyAmount() === 4) {
                this.candyNumImg = Scene.loadNewImage('./assets/img/4.png');
            }
            else if (this.player.getUserData().getCandyAmount() === 5) {
                this.candyNumImg = Scene.loadNewImage('./assets/img/5.png');
            }
            else {
                this.candyNumImg = Scene.loadNewImage('./assets/img/0.png');
            }
            this.ctx.drawImage(this.hintNumImg, 489, 670);
            this.ctx.drawImage(this.candyNumImg, 639, 670);
        }
        this.player.draw(this.ctx);
    }
}
//# sourceMappingURL=Room.js.map