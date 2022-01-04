import GameLoop from './GameLoop.js';
import StartScreen from './StartScreen.js';
export default class Game {
    canvas;
    gameLoop;
    userData;
    player;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameLoop = new GameLoop();
        this.gameLoop.start(new StartScreen(this.canvas));
    }
    getCanvas() {
        return this.canvas;
    }
}
//# sourceMappingURL=Game.js.map