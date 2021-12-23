import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
export default class DialogScreen extends Screen {
    keyboard;
    previousScene;
    dialogBubbles;
    constructor(canvas, previousScene) {
        super(canvas, './assets/img/dialogscreen.jpg');
        this.keyboard = new KeyListener();
        this.previousScene = previousScene;
        this.dialogBubbles = [];
        this.dialogBubbles.push('Hey Good Morning!');
        this.dialogBubbles.push('Welcome to school, please go to class!');
        this.setXPos(0);
        this.setYPos(0);
        console.log('hello');
    }
    processInput() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
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
    draw(ctx) {
        ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
    }
    render() {
        this.draw(this.ctx);
        this.writeTextToCanvas(this.dialogBubbles[0], 30, this.canvas.width / 2, this.canvas.height / 2, 'center', 'black');
    }
}
//# sourceMappingURL=DialogScreen.js.map