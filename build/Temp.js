import KeyListener from './KeyListener.js';
export default class Game {
    canvas;
    ctx;
    keyboard;
    garbageItems;
    player;
    countUntilNextItem;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.keyboard = new KeyListener();
        this.garbageItems = [];
        for (let i = 0; i < Game.randomNumber(3, 10); i++) {
            this.garbageItems.push({
                img: Game.loadNewImage('./assets/img/icecream.png'),
                xPos: Game.randomNumber(0, this.canvas.width - 32),
                yPos: Game.randomNumber(0, this.canvas.height - 32),
            });
        }
        this.player = {
            img: Game.loadNewImage('./assets/img/character_robot_walk0.png'),
            xPos: Game.randomNumber(0, this.canvas.width - 76),
            xVel: 3,
            yPos: Game.randomNumber(0, this.canvas.height - 92),
            yVel: 3,
        };
        this.countUntilNextItem = 300;
        this.loop();
    }
    loop = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.movePlayer();
        this.draw();
        if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
            this.cleanUpGarbage();
        }
        this.writeTextToCanvas('Score: 0', 36, 120, 50);
        if (this.countUntilNextItem === 0) {
            const choice = Game.randomNumber(0, 10);
            if (choice < 5) {
                this.garbageItems.push({
                    img: Game.loadNewImage('./assets/img/icecream.png'),
                    xPos: Game.randomNumber(0, this.canvas.width - 32),
                    yPos: Game.randomNumber(0, this.canvas.height - 32),
                });
            }
            this.countUntilNextItem = Game.randomNumber(120, 240);
        }
        this.countUntilNextItem -= 1;
        requestAnimationFrame(this.loop);
    };
    draw() {
        this.garbageItems.forEach((element) => {
            this.ctx.drawImage(element.img, element.xPos, element.yPos);
        });
        this.ctx.drawImage(this.player.img, this.player.xPos, this.player.yPos);
    }
    movePlayer() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)
            && this.player.xPos + this.player.img.width < this.canvas.width) {
            this.player.xPos += this.player.xVel;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT)
            && this.player.xPos > 0) {
            this.player.xPos -= this.player.xVel;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_UP)
            && this.player.yPos > 0) {
            this.player.yPos -= this.player.yVel;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_DOWN)
            && this.player.yPos + this.player.img.height < this.canvas.height) {
            this.player.yPos += this.player.yVel;
        }
    }
    cleanUpGarbage() {
        this.garbageItems = this.garbageItems.filter((element) => {
            if (this.player.xPos < element.xPos + element.img.width
                && this.player.xPos + this.player.img.width > element.xPos
                && this.player.yPos < element.yPos + element.img.height
                && this.player.yPos + this.player.img.height > element.yPos) {
                return false;
            }
            return true;
        });
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'white') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
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
//# sourceMappingURL=Temp.js.map