import Screen from './Screen.js';
import KeyListener from './KeyListener.js';
import MainHallway from './MainHallway.js';
export default class InstructionScreen extends Screen {
    keyListener;
    characterNum;
    constructor(canvas, characterNum) {
        super(canvas, './assets/img/controlsScreen.png');
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
        if (this.processInput()) {
            return new MainHallway(this.canvas, this.characterNum);
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
//# sourceMappingURL=InstructionScreen.js.map