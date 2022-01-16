import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
export default class QuestionScreen extends Screen {
    keyboard;
    previousScene;
    questions;
    nextQ;
    qCounter;
    frameCounter = 0;
    okPressed;
    constructor(canvas, previousScene, questions) {
        super(canvas, './assets/img/computer-screen.png');
        this.keyboard = new KeyListener();
        this.previousScene = previousScene;
        this.questions = questions;
        this.nextQ = false;
        this.qCounter = 0;
        this.okPressed = false;
        this.setXPos(this.canvas.width / 5);
        this.setYPos(this.canvas.height / 10);
    }
    processInput() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_ESC)) {
            return true;
        }
        return false;
    }
    moveBetweenQuestions() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)) {
            console.log('right pressed');
            this.nextQ = true;
        }
        else {
            this.nextQ = false;
        }
    }
    reciveAnswer() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_1)) {
            this.okPressed = true;
            return 1;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_2)) {
            this.okPressed = true;
            return 2;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_3)) {
            this.okPressed = true;
            return 3;
        }
        return 0;
    }
    update(elapsed) {
        this.moveBetweenQuestions();
        if (this.nextQ &&
            this.qCounter < this.questions.length - 1 &&
            this.frameCounter === 10) {
            this.qCounter += 1;
        }
        const userData = this.questions[this.qCounter].getUserData();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.processInput()) {
            return this.previousScene;
        }
        let answerRecived = 0;
        if (this.frameCounter % 10 === 0) {
            if (this.okPressed === false) {
                answerRecived = this.reciveAnswer();
            }
            if (answerRecived !== 0 && this.okPressed === true) {
                alert('your answer has been registered, please go to the next question >>');
            }
            if (answerRecived === this.questions[this.qCounter].getRPos() + 1) {
                userData.setScore(userData.getScore() + 1);
            }
            answerRecived = 0;
        }
        if (this.frameCounter === 10) {
            this.frameCounter = 0;
        }
        this.frameCounter += 1;
        this.okPressed = false;
        return null;
    }
    draw(ctx) {
        ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
    }
    render() {
        this.draw(this.ctx);
        if (this.qCounter < this.questions.length) {
            this.writeTextToCanvas(`Q num ${this.qCounter + 1} / ${this.questions.length}`, 24, this.canvas.width / 3, 220, 'center', 'Red');
            let textToWrite = '';
            let j = 0;
            let textHPos = this.canvas.height / 3;
            const textWPos = this.canvas.width / 1.9;
            for (let i = 0; i < 3; i += 1) {
                textToWrite = this.questions[this.qCounter].getText(i);
                this.writeTextToCanvas(textToWrite, 20, textWPos, textHPos, 'center', 'black');
                textHPos += 50;
            }
            for (let i = 0; i <= 2; i += 1) {
                if (this.questions[this.qCounter].getRPos() === i) {
                    textToWrite = `${i + 1} ${this.questions[this.qCounter].getRAns()}`;
                }
                else if (j <= 1) {
                    textToWrite = `${i + 1} ${this.questions[this.qCounter].getWAns(j)}`;
                    j += 1;
                }
                this.writeTextToCanvas(textToWrite, 20, textWPos - 200, textHPos + 20, 'left', 'black');
                textHPos += 50;
            }
        }
        if (this.qCounter === this.questions.length - 1) {
            this.writeTextToCanvas('press ESC to leave', 24, this.canvas.width / 2 + 100, 600, 'center', 'Red');
        }
        else {
            this.writeTextToCanvas('Next Question >', 24, this.canvas.width / 2 + 100, 600, 'center', 'Red');
        }
    }
}
//# sourceMappingURL=QuestionScreen.js.map