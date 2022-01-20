import Screen from './Screen.js';
import ParentsScreen from './ParentsScreen.js';
import KeyListener from './KeyListener.js';
export default class CharacterPick extends Screen {
    keyListener;
    characterNum;
    constructor(canvas) {
        super(canvas, './assets/img/characterPick.png');
        this.characterNum = 0;
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
    chooseCharacter() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_1)) {
            return 1;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_2)) {
            return 2;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_3)) {
            return 3;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_4)) {
            return 4;
        }
        return 0;
    }
    update(elapsed) {
        const temp = this.chooseCharacter();
        if (temp !== 0) {
            this.characterNum = temp;
        }
        if (this.characterNum === 1) {
            this.setImage('./assets/img/characterPick1.png');
        }
        else if (this.characterNum === 2) {
            this.setImage('./assets/img/characterPick2.png');
        }
        else if (this.characterNum === 3) {
            this.setImage('./assets/img/characterPick3.png');
        }
        else if (this.characterNum === 4) {
            this.setImage('./assets/img/characterPick4.png');
        }
        if (this.characterNum !== 0) {
            if (this.processInput()) {
                return new ParentsScreen(this.canvas, this.characterNum);
            }
        }
        return null;
    }
    draw(ctx) {
        ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
    }
    render() {
        this.draw(this.ctx);
        this.writeTextToCanvas('press SPACE to choose and continue', 24, this.canvas.width / 2, this.canvas.height - 50, 'center', 'white');
    }
}
//# sourceMappingURL=CharacterPick.js.map