import Scene from './Scene.js';
import Menu from './Menu.js';
import Candy from './Candy.js';
import Hint from './Hint.js';
import DialogScreen from './DialogScreen.js';
import HintScreen from './HintScreen.js';
import Hitbox from './Hitbox.js';
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
    hitboxes;
    constructor(canvas, imgSrc, state = false) {
        super(canvas);
        const canvasPosition = this.canvas.getBoundingClientRect();
        this.canvas.addEventListener('click', (event) => {
            console.log(event.x - canvasPosition.left, event.y - canvasPosition.top);
        });
        this.img = new Image();
        this.img.src = imgSrc;
        this.doorClose = new Audio('./assets/sound/DoorClose.ogg');
        this.doorOpen = new Audio('./assets/sound/DoorOpen.ogg');
        this.menu = new Menu(this.canvas.width / 3 - 100, 600);
        this.isMenuShowing = false;
        this.hitboxes = [];
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
        let isPlayerColliding = 'none';
        this.hitboxes.forEach((box) => {
            if (this.player.rectCollision(box, this.player) !== 'none') {
                isPlayerColliding = this.player.rectCollision(box, this.player);
            }
        });
        this.player.setCollision(isPlayerColliding);
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
        if (this.player.isReadingHint() &&
            this.player.getUserData().getHintAmount() > 0) {
            this.player
                .getUserData()
                .setHintAmount(this.player.getUserData().getHintAmount() - 1);
            this.player
                .getUserData()
                .setHintNum(this.player.getUserData().getHintNum() + 1);
            return new HintScreen(this.canvas, this, this.player.getUserData().getHintNum() - 1);
        }
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
            for (let i = 0; i < this.npcs.length; i += 1) {
                if (this.player.collidesWith(this.npcs[i])) {
                    const currentNPC = this.npcs[i];
                    currentNPC.getDialogs().forEach((str) => {
                        if (str.getText(0) === 'Hello, I lost my backpack....') {
                            this.player.getUserData().getQuests().push('Find backpack');
                            this.npcs.splice(i, 1);
                        }
                        if (str.getText(0) ===
                            'Hey there! Have you seen a teddy bear around here?') {
                            this.player.getUserData().getQuests().push('Look for Teddy');
                            this.npcs.splice(i, 1);
                        }
                        if (str.getText(0) === 'Hey, listen...have you seen a doll?') {
                            this.player.getUserData().getQuests().push('Help find doll');
                            this.npcs.splice(i, 1);
                        }
                    });
                    return new DialogScreen(this.canvas, this, currentNPC.getDialogs());
                }
            }
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
            this.filterQuestItems();
        }
        this.frameCounter += 1;
        return null;
    }
    filterQuestItems() {
        this.player
            .getUserData()
            .getQuestItems()
            .forEach((item, i) => {
            if (this.player.collidesWith(item)) {
                console.log(this.player.getUserData().getQuestItems());
                if (item.getName() === 'backpack') {
                    this.player.getUserData().getQuests().splice(i, 1);
                    this.player.getUserData().getQuestItems().splice(i, 1);
                    this.player
                        .getUserData()
                        .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
                }
                if (item.getName() === 'teddy') {
                    this.player.getUserData().getQuests().splice(i, 1);
                    this.player.getUserData().getQuestItems().splice(i, 1);
                    this.player
                        .getUserData()
                        .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
                }
                if (item.getName() === 'doll') {
                    this.player.getUserData().getQuests().splice(i, 1);
                    this.player.getUserData().getQuestItems().splice(i, 1);
                    this.player
                        .getUserData()
                        .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
                }
            }
        });
    }
    drawQuestItems() {
        if (this.player.getUserData().getQuests()[0]) {
            this.writeTextToCanvas(this.player.getUserData().getQuests()[0], 30, 620, 647, 'left', 'black');
        }
        if (this.player.getUserData().getQuests()[1]) {
            this.writeTextToCanvas(this.player.getUserData().getQuests()[1], 30, 620, 682, 'left', 'black');
        }
        if (this.player.getUserData().getQuests()[2]) {
            this.writeTextToCanvas(this.player.getUserData().getQuests()[2], 30, 620, 714, 'left', 'black');
        }
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.xPos, this.yPos);
    }
    drawHitBoxes() {
        this.hitboxes.forEach((box) => {
            box.draw(this.canvas);
        });
    }
    insertHitbox(x, y, w, h) {
        this.hitboxes.push(new Hitbox(x, y, w, h));
    }
    render() {
        this.writeTextToCanvas('press M to hide/unhide menu', 24, this.canvas.width / 2, this.canvas.height - 50, 'center', 'Blue');
        this.writeTextToCanvas('press Space to ineract', 24, this.canvas.width / 2, this.canvas.height - 80, 'center', 'Blue');
        for (let i = 0; i < this.npcs.length; i += 1) {
            this.npcs[i].draw(this.ctx);
        }
        for (let i = 0; i < this.collectibles.length; i++) {
            this.collectibles[i].draw(this.ctx);
        }
        for (let i = 0; i < this.doors.length; i += 1) {
            this.doors[i].draw(this.ctx);
        }
        this.player.draw(this.ctx);
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
            else if (this.player.getUserData().getHintAmount() === 6) {
                this.hintNumImg = Scene.loadNewImage('./assets/img/6.png');
            }
            else if (this.player.getUserData().getHintAmount() === 7) {
                this.hintNumImg = Scene.loadNewImage('./assets/img/7.png');
            }
            else if (this.player.getUserData().getHintAmount() === 8) {
                this.hintNumImg = Scene.loadNewImage('./assets/img/8.png');
            }
            else if (this.player.getUserData().getHintAmount() === 9) {
                this.hintNumImg = Scene.loadNewImage('./assets/img/9.png');
            }
            else if (this.player.getUserData().getHintAmount() === 10) {
                this.hintNumImg = Scene.loadNewImage('./assets/img/10.png');
            }
            else if (this.player.getUserData().getHintAmount() === 0) {
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
            else if (this.player.getUserData().getCandyAmount() === 6) {
                this.candyNumImg = Scene.loadNewImage('./assets/img/6.png');
            }
            else if (this.player.getUserData().getCandyAmount() === 7) {
                this.candyNumImg = Scene.loadNewImage('./assets/img/7.png');
            }
            else if (this.player.getUserData().getCandyAmount() === 8) {
                this.candyNumImg = Scene.loadNewImage('./assets/img/8.png');
            }
            else if (this.player.getUserData().getCandyAmount() === 9) {
                this.candyNumImg = Scene.loadNewImage('./assets/img/9.png');
            }
            else if (this.player.getUserData().getCandyAmount() === 10) {
                this.candyNumImg = Scene.loadNewImage('./assets/img/10.png');
            }
            else if (this.player.getUserData().getCandyAmount() === 0) {
                this.candyNumImg = Scene.loadNewImage('./assets/img/0.png');
            }
            this.drawQuestItems();
            this.ctx.drawImage(this.hintNumImg, 400, 670, 50, 50);
            this.ctx.drawImage(this.candyNumImg, 545, 670, 50, 50);
            const cNum = this.player.getCharacterNum();
            let characterImg = Scene.loadNewImage('');
            if (cNum === 1) {
                characterImg = Scene.loadNewImage('./assets/img/boy1Face.png');
            }
            else if (cNum === 2) {
                characterImg = Scene.loadNewImage('./assets/img/boy2Face.png');
            }
            else if (cNum === 3) {
                characterImg = Scene.loadNewImage('./assets/img/girl2Face.png');
            }
            else if (cNum === 4) {
                characterImg = Scene.loadNewImage('./assets/img/girl1Face.png');
            }
            this.ctx.drawImage(characterImg, 280, 600, 130, 130);
        }
    }
}
//# sourceMappingURL=Room.js.map