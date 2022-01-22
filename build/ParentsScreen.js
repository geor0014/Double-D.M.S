import Screen from './Screen.js';
import KeyListener from './KeyListener.js';
import InstructionScreen from './InstructionScreen.js';
export default class ParentsScreen extends Screen {
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
            this.setImage('./assets/img/DialogParentsBoy1.png');
        }
        else if (this.characterNum === 2) {
            this.setImage('./assets/img/DialogParentsBoy2.png');
        }
        else if (this.characterNum === 3) {
            this.setImage('./assets/img/DialogParentsGirl2.png');
        }
        else if (this.characterNum === 4) {
            this.setImage('./assets/img/DialogParentsGirl1.png');
        }
        if (this.characterNum !== 0) {
            if (this.processInput()) {
                return new InstructionScreen(this.canvas, this.characterNum);
            }
        }
        return null;
    }
    draw(ctx) {
        ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
    }
    render() {
        this.draw(this.ctx);
    }
}
//# sourceMappingURL=ParentsScreen.js.map