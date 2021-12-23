import Hallway from './Hallway.js';
import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
export default class StartScreen extends Screen {
    keyListener;
    constructor(canvas) {
        super(canvas, './assets/img/school-front.png');
        this.keyListener = new KeyListener();
        this.setXPos(this.canvas.width / 4);
        this.setYPos(this.canvas.height / 4 - 50);
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_SPACE)) {
            return true;
        }
        return false;
    }
    update(elapsed) {
        if (this.processInput()) {
            return new Hallway(this.canvas);
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
//# sourceMappingURL=StartScreen.js.map