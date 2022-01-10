import Screen from './Screen.js';
import KeyListener from './KeyListener.js';
export default class HintScreen extends Screen {
    previousScene;
    hintNum;
    hints;
    keyboard;
    constructor(canvas, previousSceen, hintNum) {
        super(canvas, './assets/img/hint-screen.png');
        this.previousScene = previousSceen;
        this.keyboard = new KeyListener();
        this.hintNum = hintNum;
        this.setXPos(0);
        this.setYPos(0);
        this.hints = ['a', 'b', 'c', 'd', 'e'];
    }
    processInput() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_H)) {
            return true;
        }
        return false;
    }
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.processInput()) {
            return this.previousScene;
        }
        return null;
    }
    render() {
        this.draw(this.ctx);
        this.writeTextToCanvas(this.hints[this.hintNum], 30, this.canvas.width / 2, this.canvas.height / 2, 'center', 'black');
    }
    draw(ctx) {
        ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
    }
}
//# sourceMappingURL=HintScreen.js.map