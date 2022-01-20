import InteractiveScreen from './InteractiveScreen.js';
export default class QuestionScreen extends InteractiveScreen {
    questions;
    constructor(canvas, previousScene, questions) {
        super(canvas, previousScene, './assets/img/computerScreen.png');
        this.questions = questions;
        this.setTextToPresent('No answer recieved');
    }
    update(elapsed) {
        this.moveBetweenInteractions();
        if (this.getNextText() &&
            this.getTCounter() < this.questions.length - 1 &&
            this.getFrameCounter() === 10) {
            this.setImage('./assets/img/computerScreen.png');
            this.setOkPressed(false);
            this.setTCounter(this.getTCounter() + 1);
            this.setTextToPresent('No answer recieved');
        }
        const userData = this.questions[this.getTCounter()].getUserData();
        console.log(` score ${userData.getScore()}`);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.processInput()) {
            return this.getPreviousScene();
        }
        let answerRecived = 0;
        if (this.getFrameCounter() % 10 === 0) {
            if (this.getOkPressed() === false) {
                answerRecived = this.reciveAnswer();
            }
            if (answerRecived !== 0 && this.getOkPressed() === true) {
                if (answerRecived === 1) {
                    this.setImage('./assets/img/computerScreen1.png');
                }
                else if (answerRecived === 2) {
                    this.setImage('./assets/img/computerScreen2.png');
                }
                else {
                    this.setImage('./assets/img/computerScreen3.png');
                }
                this.setTextToPresent('your answer has been registered, please go to the next question >>');
                if (answerRecived === this.questions[this.getTCounter()].getRPos() + 1) {
                    userData.setScore(userData.getScore() + 1);
                }
            }
        }
        if (this.getFrameCounter() === 10) {
            this.setFrameCounter(0);
        }
        this.setFrameCounter(this.getFrameCounter() + 1);
        return null;
    }
    render() {
        this.draw(this.ctx);
        if (this.getTCounter() < this.questions.length) {
            this.writeTextToCanvas(`Q num ${this.getTCounter() + 1} / ${this.questions.length}`, 24, this.canvas.width / 5, 230, 'center', 'Red');
            let textToWrite = '';
            let j = 0;
            let textHPos = this.canvas.height / 3 + 20;
            const textWPos = this.canvas.width / 5 - 20;
            for (let i = 0; i < 3; i += 1) {
                textToWrite = this.questions[this.getTCounter()].getText(i);
                this.writeTextToCanvas(textToWrite, 20, textWPos, textHPos, 'left', 'black');
                textHPos += 50;
            }
            for (let i = 0; i <= 2; i += 1) {
                if (this.questions[this.getTCounter()].getRPos() === i) {
                    textToWrite = `${i + 1} ${this.questions[this.getTCounter()].getRAns()}`;
                }
                else if (j <= 1) {
                    textToWrite = `${i + 1} ${this.questions[this.getTCounter()].getWAns(j)}`;
                    j += 1;
                }
                this.writeTextToCanvas(textToWrite, 20, this.canvas.width / 5, textHPos + 20, 'left', 'black');
                textHPos += 50;
            }
        }
        if (this.getTCounter() === this.questions.length - 1) {
            this.writeTextToCanvas('press ESC to leave', 24, this.canvas.width / 2 + 100, 600, 'center', 'Red');
        }
        else {
            this.writeTextToCanvas('Next Question right arrow ->', 24, this.canvas.width / 2 + 100, 600, 'center', 'Red');
        }
        this.writeTextToCanvas(this.getTextToPresent(), 24, this.canvas.width / 2, 675, 'center', 'red');
    }
}
//# sourceMappingURL=QuestionScreen.js.map