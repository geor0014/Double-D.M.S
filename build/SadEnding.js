import Screen from './Screen.js';
import KeyListener from './KeyListener.js';
import StartScreen from './StartScreen.js';
export default class SadEnding extends Screen {
    keyListener;
    characterNum;
    constructor(canvas, characterNum) {
        super(canvas, '');
        this.characterNum = characterNum;
        this.keyListener = new KeyListener();
        this.setXPos(0);
        this.setYPos(0);
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_SPACE)) {
            return true;
        }
        return false;
    }
    update(elapsed) {
        if (this.characterNum === 1) {
            this.setImage('./assets/img/SadEndingBoy1.png');
        }
        else if (this.characterNum === 2) {
            this.setImage('./assets/img/SadEndingBoy2.png');
        }
        else if (this.characterNum === 3) {
            this.setImage('./assets/img/SadEndingGirl2.png');
        }
        else if (this.characterNum === 4) {
            this.setImage('./assets/img/SadEndingGirl1.png');
        }
        if (this.processInput()) {
            return new StartScreen(this.canvas);
        }
        return null;
    }
    draw(ctx) {
        ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
    }
    render() {
        this.draw(this.ctx);
        this.writeTextToCanvas('press SPACE to Start Again :)', 24, this.canvas.width / 2, this.canvas.height - 50, 'center', 'white');
    }
}
//# sourceMappingURL=SadEnding.js.map