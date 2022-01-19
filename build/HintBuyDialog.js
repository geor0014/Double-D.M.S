import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
export default class CandyBuyDialog extends Screen {
    keyboard;
    previousScene;
    dialogs;
    nextD;
    dCounter;
    frameCounter = 0;
    okPressed;
    textToPresent;
    userData;
    constructor(canvas, previousScene, dialogs, userData) {
        super(canvas, './assets/img/lunch-lady-dialog.png');
        this.keyboard = new KeyListener();
        this.previousScene = previousScene;
        this.dialogs = dialogs;
        this.nextD = false;
        this.dCounter = 0;
        this.okPressed = false;
        this.setXPos(0);
        this.setYPos(0);
        this.textToPresent = '...';
        this.userData = userData;
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
        return 0;
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
        const candyAmount = this.userData.getCandyAmount();
        const hintAmount = this.userData.getHintAmount();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.processInput()) {
            return this.previousScene;
        }
        this.moveBetweenDialogs();
        if (this.nextD &&
            this.dCounter < this.dialogs.length - 1 &&
            this.frameCounter === 15) {
            this.dCounter += 1;
            this.textToPresent = '...';
        }
        let answerRecived = 0;
        if (this.frameCounter % 15 === 0) {
            if (this.okPressed === false) {
                answerRecived = this.reciveAnswer();
            }
            if (answerRecived !== 0 && this.okPressed === true) {
                if (this.dCounter === this.dialogs.length - 1) {
                    if (answerRecived === 1) {
                        if (this.userData.getCandyAmount() > 1) {
                            this.userData.setCandyAmount(candyAmount - 2);
                            this.userData.setHintAmount(hintAmount + 1);
                            this.textToPresent = `${this.dialogs[this.dCounter].getReplies()[0]}`;
                        }
                        else {
                            this.textToPresent = 'You dont have enough candy, 2 candy for 1 hint';
                        }
                    }
                }
                else if (answerRecived === 1) {
                    this.textToPresent = `${this.dialogs[this.dCounter].getReplies()[0]}`;
                }
                else {
                    this.textToPresent = `${this.dialogs[this.dCounter].getReplies()[1]}`;
                }
            }
            answerRecived = 0;
        }
        if (this.frameCounter === 15) {
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
        if (this.dCounter < this.dialogs.length) {
            this.writeTextToCanvas(`Dialog to go ${this.dCounter + 1} / ${this.dialogs.length}`, 24, this.canvas.width / 2, 420, 'center', 'Grey');
            let textToWrite = '';
            let textHPos = this.canvas.height / 2.5;
            const textWPos = this.canvas.width / 3.5;
            for (let i = 0; i < 3; i += 1) {
                textToWrite = this.dialogs[this.dCounter].getText(i);
                this.writeTextToCanvas(textToWrite, 30, textWPos + 150, textHPos, 'center', 'black');
                textHPos += 50;
            }
            for (let j = 0; j < 2; j += 1) {
                textToWrite = `${j + 1} ${this.dialogs[this.dCounter].getAnswers()[j]}`;
                this.writeTextToCanvas(textToWrite, 24, this.canvas.width / 5, textHPos + 20, 'left', 'black');
                textHPos += 50;
            }
        }
        if (this.dCounter === this.dialogs.length - 1) {
            this.writeTextToCanvas('press ESC to leave', 24, this.canvas.width / 2 + 200, 420, 'center', 'Grey');
        }
        else {
            this.writeTextToCanvas('Next - right arrow ->', 24, this.canvas.width / 2 + 200, 420, 'center', 'Grey');
        }
        this.writeTextToCanvas(this.textToPresent, 30, this.canvas.width / 3, this.canvas.height / 4, 'center', 'red');
    }
}
//# sourceMappingURL=HintBuyDialog.js.map