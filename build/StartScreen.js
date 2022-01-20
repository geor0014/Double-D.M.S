import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
import CharacterPick from './CharacterPick.js';
export default class StartScreen extends Screen {
    keyListener;
    music;
    constructor(canvas) {
        super(canvas, './assets/img/schoolFront.png');
        this.music = new Audio('./assets/sound/StartScreen.mp3');
        this.music.volume = 0.2;
        this.music.play();
        this.keyListener = new KeyListener();
        this.setXPos(0);
        this.setYPos(0);
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_SPACE)) {
            this.music.pause();
            return true;
        }
        return false;
    }
    update(elapsed) {
        if (this.processInput()) {
            return new CharacterPick(this.canvas);
        }
        return null;
    }
    draw(ctx) {
        ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
    }
    render() {
        this.draw(this.ctx);
        this.writeTextToCanvas('press SPACE to start', 100, this.canvas.width / 2, this.canvas.height / 2, 'center', 'Yellow');
    }
}
//# sourceMappingURL=StartScreen.js.map