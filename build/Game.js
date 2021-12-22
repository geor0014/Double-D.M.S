import GameLoop from './GameLoop.js';
import Hallway from './Hallway.js';
export default class Game {
    canvas;
    gameLoop;
    player;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameLoop = new GameLoop();
        this.gameLoop.start(new Hallway(this.canvas));
    }
    getCanvas() {
        return this.canvas;
    }
}
//# sourceMappingURL=Game.js.map