import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
export default class QuestionScreen extends Screen {
    keyboard;
    previousScene;
    question;
    constructor(canvas, previousScene, question) {
        super(canvas, './assets/img/computer-screen.png');
        this.keyboard = new KeyListener();
        this.previousScene = previousScene;
        this.question = question;
        this.setXPos(this.canvas.width / 5);
        this.setYPos(this.canvas.height / 10);
    }
    processInput() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_ESC)) {
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
        let textToWrite = '';
        let j = 0;
        let textHPos = this.canvas.height / 3;
        this.draw(this.ctx);
        this.writeTextToCanvas(this.question.getQTxt(), 30, this.canvas.width / 3, textHPos, 'center', 'black');
        for (let i = 0; i <= 2; i += 1) {
            textHPos += 50;
            console.log(`${this.question.getRPos()}`);
            if (this.question.getRPos() === i) {
                textToWrite = `${i + 1} ${this.question.getRAns()}`;
            }
            else if (j <= 1) {
                textToWrite = `${i + 1} ${this.question.getWAns(j)}`;
                j += 1;
            }
            this.writeTextToCanvas(textToWrite, 30, this.canvas.width / 3, textHPos, 'center', 'black');
        }
    }
}
//# sourceMappingURL=QuestionScreen.js.map