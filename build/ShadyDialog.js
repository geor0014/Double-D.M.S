import SadEnding from './SadEnding.js';
import DialogParent from './DialogParent.js';
export default class ShadyDialog extends DialogParent {
    characterNum;
    constructor(canvas, previousScene, dialogs, characterNum) {
        super(canvas, previousScene, dialogs, './assets/img/dialogScreenShadyGuy.png');
        this.characterNum = characterNum;
    }
<<<<<<< HEAD
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
            this.nextD = true;
        }
        else {
            this.nextD = false;
        }
    }
=======
>>>>>>> 8a21a8d4bd2497e86c32f9daf6e79cda090ba92a
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.processInput()) {
            return this.getPreviousScene();
        }
<<<<<<< HEAD
        this.moveBetweenDialogs();
        if (this.nextD
            && this.dCounter < this.dialogs.length - 1
            && this.frameCounter === 15) {
            this.dCounter += 1;
            this.textToPresent = '...';
=======
        this.moveBetweenInteractions();
        if (this.getNextText()
            && this.getTCounter() < this.getDialogs().length - 1
            && this.getFrameCounter() === 10) {
            this.setTCounter(this.getTCounter() + 1);
            this.setTextToPresent('...');
>>>>>>> 8a21a8d4bd2497e86c32f9daf6e79cda090ba92a
        }
        let answerRecived = 0;
        if (this.getFrameCounter() % 15 === 0) {
            if (this.getOkPressed() === false) {
                answerRecived = this.reciveAnswer();
            }
            if (answerRecived !== 0 && this.getOkPressed() === true) {
                if (this.getTCounter() === this.getDialogs().length - 1) {
                    if (answerRecived === 1) {
                        return new SadEnding(this.canvas, this.characterNum);
                    }
                    this.setTextToPresent(this.getDialogs()[this.getTCounter()].getReplies()[1]);
                }
                else if (answerRecived === 1) {
                    this.setTextToPresent(this.getDialogs()[this.getTCounter()].getReplies()[0]);
                }
                else if (answerRecived === 2) {
                    this.setTextToPresent(this.getDialogs()[this.getTCounter()].getReplies()[1]);
                }
            }
            answerRecived = 0;
        }
        if (this.getFrameCounter() === 15) {
            this.setFrameCounter(0);
        }
        this.setFrameCounter(this.getFrameCounter() + 1);
        this.setOkPressed(false);
        return null;
    }
}
//# sourceMappingURL=ShadyDialog.js.map