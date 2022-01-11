import GameLoop from './GameLoop.js';
import StartScreen from './StartScreen.js';
export default class Game {
    canvas;
    gameLoop;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.addEventListener('resize', this.resizeCanvas());
        this.gameLoop = new GameLoop();
        this.gameLoop.start(new StartScreen(this.canvas));
    }
    getCanvas() {
        return this.canvas;
    }
    resizeCanvas() {
        console.log('resized');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}
//# sourceMappingURL=Game.js.map