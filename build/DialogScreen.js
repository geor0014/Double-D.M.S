import KeyListener from './KeyListener.js';
import Scene from './Scene.js';
export default class DialogScreen extends Scene {
    keyboard;
    next;
    previousScene;
    dialogBubbles;
    countdown;
    xPos;
    yPos;
    img;
    constructor(canvas, previousScene) {
        super(canvas);
        this.keyboard = new KeyListener();
        this.previousScene = previousScene;
        this.dialogBubbles = [];
        this.dialogBubbles.push('Hey Good Morning!');
        this.dialogBubbles.push('Welcome to school, please go to class!');
        this.countdown = this.dialogBubbles.length;
        this.img = Scene.loadNewImage('./assets/img/dialogscreen.jpg');
        this.xPos = 0;
        this.yPos = 0;
        console.log('hello');
        this.next = false;
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
        ctx.drawImage(this.img, this.xPos, this.yPos);
    }
    render() {
        this.draw(this.ctx);
        this.writeTextToCanvas(this.dialogBubbles[0], 24, this.canvas.width / 2, this.canvas.height / 2, 'center', 'black');
    }
}
//# sourceMappingURL=DialogScreen.js.map