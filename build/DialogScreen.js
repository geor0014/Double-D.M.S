import DialogParent from './DialogParent.js';
export default class DialogScreen extends DialogParent {
    constructor(canvas, previousScene, dialogs) {
        super(canvas, previousScene, dialogs, './assets/img/dialogscreen.png');
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
            this.setOkPressed(false);
            this.setTCounter(this.getTCounter() + 1);
            this.setTextToPresent('...');
        }
        let answerRecived = 0;
        if (this.getFrameCounter() % 10 === 0) {
            if (this.getOkPressed() === false) {
                answerRecived = this.reciveAnswer();
            }
            if (answerRecived !== 0 && this.getOkPressed() === true) {
                if (answerRecived === 1) {
                    this.setTextToPresent(this.getDialogs()[this.getTCounter()].getReplies()[0]);
                }
                else if (answerRecived === 2) {
                    this.setTextToPresent(this.getDialogs()[this.getTCounter()].getReplies()[1]);
                }
            }
            answerRecived = 0;
        }
        if (this.getFrameCounter() === 10) {
            this.setFrameCounter(0);
        }
        this.setFrameCounter(this.getFrameCounter() + 1);
        return null;
    }
}
//# sourceMappingURL=DialogScreen.js.map