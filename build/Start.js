import Scene from './Scene.js';
import Level from './Level.js';
import KeyListener from './KeyListener.js';
export default class Start extends Scene {
    keyListener;
    progressToNextScene;
    constructor(game) {
        super(game);
        this.progressToNextScene = false;
        this.keyListener = new KeyListener();
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
            this.progressToNextScene = true;
        }
    }
    update(elapsed) {
        if (this.progressToNextScene) {
            return new Level(this.game);
        }
        return null;
    }
    render() {
        this.writeTextToCanvas('SuperCleaner!', 100, this.canvas.width / 2, this.canvas.height / 2 - 100, 'center', 'red');
        this.writeTextToCanvas('Press S to Start', 24, this.canvas.width / 2, this.canvas.height - 50);
    }
}
//# sourceMappingURL=Start.js.map