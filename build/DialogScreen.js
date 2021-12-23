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
        this.next = false;
    }
    processInput() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
            this.next = true;
        }
        this.next = false;
    }
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.dialogBubbles.length; i += 1) {
            if (i === 0) {
                this.writeTextToCanvas(this.dialogBubbles[i], 24, this.canvas.width / 2, this.canvas.height / 2, 'center', 'black');
                this.countdown -= 1;
            }
            else if (this.next) {
                this.writeTextToCanvas(this.dialogBubbles[i], 24, this.canvas.width / 2, this.canvas.height / 2, 'center', 'black');
                this.countdown -= 1;
            }
        }
        if (this.countdown <= 0 && this.next) {
            return this.previousScene;
        }
        return null;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.xPos, this.yPos);
    }
    render() {
        this.draw(this.ctx);
    }
}
//# sourceMappingURL=DialogScreen.js.map