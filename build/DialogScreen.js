import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
export default class DialogScreen extends Screen {
    keyboard;
    previousScene;
    dialogs;
    nextD;
    dCounter;
    frameCounter = 0;
    constructor(canvas, previousScene, dialogs) {
        super(canvas, './assets/img/dialogscreen.png');
        this.keyboard = new KeyListener();
        this.previousScene = previousScene;
        this.dialogs = dialogs;
        this.nextD = false;
        this.dCounter = 0;
        this.setXPos(0);
        this.setYPos(0);
    }
    processInput() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_ESC)) {
            return true;
        }
        return false;
    }
    moveBetweenDialogs() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)) {
            console.log('right pressed');
            this.nextD = true;
        }
        else {
            this.nextD = false;
        }
    }
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.processInput()) {
            return this.previousScene;
        }
        this.moveBetweenDialogs();
        if (this.nextD &&
            this.dCounter < this.dialogs.length - 1 &&
            this.frameCounter === 10) {
            this.dCounter += 1;
        }
        if (this.frameCounter === 10) {
            this.frameCounter = 0;
        }
        this.frameCounter += 1;
        return null;
    }
    draw(ctx) {
        ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
    }
    render() {
        this.draw(this.ctx);
        if (this.dCounter < this.dialogs.length) {
            let textToWrite = '';
            let textHPos = this.canvas.height / 2.5;
            const textWPos = this.canvas.width / 3.5;
            for (let i = 0; i < 3; i += 1) {
                textToWrite = this.dialogs[this.dCounter].getText(i);
                this.writeTextToCanvas(textToWrite, 30, textWPos + 150, textHPos, 'center', 'black');
                textHPos += 50;
            }
        }
    }
}
//# sourceMappingURL=DialogScreen.js.map