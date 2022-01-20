import SadEnding from './SadEnding.js';
import DialogParent from './DialogParent.js';
export default class ShadyDialog extends DialogParent {
    characterNum;
    constructor(canvas, previousScene, dialogs, characterNum) {
        super(canvas, previousScene, dialogs, './assets/img/dialogScreenShadyGuy.png');
        this.characterNum = characterNum;
    }
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.processInput()) {
            return this.getPreviousScene();
        }
        this.moveBetweenInteractions();
        if (this.getNextText()
            && this.getTCounter() < this.getDialogs().length - 1
            && this.getFrameCounter() === 10) {
            this.setTCounter(this.getTCounter() + 1);
            this.setTextToPresent('...');
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