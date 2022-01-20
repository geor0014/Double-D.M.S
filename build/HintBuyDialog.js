import DialogParent from './DialogParent.js';
export default class CandyBuyDialog extends DialogParent {
    userData;
    constructor(canvas, previousScene, dialogs, userData) {
        super(canvas, previousScene, dialogs, './assets/img/lunchLadyDialog.png');
        this.userData = userData;
    }
    update(elapsed) {
        const candyAmount = this.userData.getCandyAmount();
        const hintAmount = this.userData.getHintAmount();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.processInput()) {
            return this.getPreviousScene();
        }
        this.moveBetweenInteractions();
        if (this.getNextText()
            && this.getTCounter() < this.getDialogs().length - 1
            && this.getFrameCounter() === 15) {
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
                        if (this.userData.getCandyAmount() > 1) {
                            this.userData.setCandyAmount(candyAmount - 2);
                            this.userData.setHintAmount(hintAmount + 1);
                            this.setTextToPresent(this.getDialogs()[this.getTCounter()].getReplies()[0]);
                        }
                        else {
                            this.setTextToPresent('You dont have enough candy, 2 candy for 1 hint');
                        }
                    }
                    else if (answerRecived === 2) {
                        this.setTextToPresent(this.getDialogs()[this.getTCounter()].getReplies()[1]);
                    }
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
//# sourceMappingURL=HintBuyDialog.js.map