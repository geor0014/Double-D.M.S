import SadEnding from './SadEnding.js';
import DialogParent from './DialogParent.js';
export default class ShadyDialog extends DialogParent {
    characterNum;
    constructor(canvas, previousScene, dialogs, characterNum) {
        super(canvas, previousScene, dialogs, './assets/img/dialogScreenShadyGuy.png');
        this.characterNum = characterNum;
    }
<<<<<<< HEAD
=======
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
<<<<<<< HEAD
            console.log('right pressed');
=======
>>>>>>> 86bdae84640bc8b1b180d6742262bc797e494dac
            this.nextD = true;
        }
        else {
            this.nextD = false;
        }
    }
>>>>>>> e78397f7aa896ee55f34988fdebd5e4d6fde0af9
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.processInput()) {
            return this.getPreviousScene();
        }
<<<<<<< HEAD
        this.moveBetweenInteractions();
        if (this.getNextText()
            && this.getTCounter() < this.getDialogs().length - 1
            && this.getFrameCounter() === 10) {
            this.setTCounter(this.getTCounter() + 1);
            this.setTextToPresent('...');
=======
        this.moveBetweenDialogs();
<<<<<<< HEAD
        if (this.nextD &&
            this.dCounter < this.dialogs.length - 1 &&
            this.frameCounter === 15) {
=======
        if (this.nextD
            && this.dCounter < this.dialogs.length - 1
            && this.frameCounter === 15) {
>>>>>>> 86bdae84640bc8b1b180d6742262bc797e494dac
            this.dCounter += 1;
            this.textToPresent = '...';
>>>>>>> e78397f7aa896ee55f34988fdebd5e4d6fde0af9
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