import InteractiveScreen from './InteractiveScreen.js';
export default class DialogParent extends InteractiveScreen {
    dialogs;
    constructor(canvas, previousScene, dialogs, imgSrc) {
        super(canvas, previousScene, imgSrc);
        this.dialogs = dialogs;
        this.setTextToPresent('...');
    }
    render() {
        this.draw(this.ctx);
        if (this.getTCounter() < this.dialogs.length) {
            this.writeTextToCanvas(`Dialog to go ${this.getTCounter() + 1} / ${this.dialogs.length}`, 24, this.canvas.width / 2, 420, 'center', 'Grey');
            let textToWrite = '';
            let textHPos = this.canvas.height / 2.5;
            const textWPos = this.canvas.width / 3.5;
            for (let i = 0; i < 3; i += 1) {
                textToWrite = this.dialogs[this.getTCounter()].getText(i);
                this.writeTextToCanvas(textToWrite, 30, textWPos + 150, textHPos, 'center', 'black');
                textHPos += 50;
            }
            for (let j = 0; j < 2; j += 1) {
                textToWrite = `${j + 1} ${this.dialogs[this.getTCounter()].getAnswers()[j]}`;
                this.writeTextToCanvas(textToWrite, 24, this.canvas.width / 5, textHPos + 20, 'left', 'black');
                textHPos += 50;
            }
        }
        if (this.getTCounter() === this.dialogs.length - 1) {
            this.writeTextToCanvas('press ESC to leave', 24, this.canvas.width / 2 + 200, 420, 'center', 'Grey');
        }
        else {
            this.writeTextToCanvas('Next - right arrow ->', 24, this.canvas.width / 2 + 200, 420, 'center', 'Grey');
        }
        this.writeTextToCanvas(this.getTextToPresent(), 30, this.canvas.width / 3, this.canvas.height / 4, 'center', 'red');
    }
    getDialogs() {
        return this.dialogs;
    }
    setDialogs(dialogs) {
        this.dialogs = dialogs;
    }
}
//# sourceMappingURL=DialogParent.js.map