import GameLoop from './GameLoop.js';
import Hallway from './Hallway.js';
import Player from './Player.js';
export default class Game {
    randomNumber;
    canvas;
    gameLoop;
    player;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.player = new Player(this.canvas);
        this.gameLoop = new GameLoop();
        this.gameLoop.start(new Hallway(this.canvas, this.player));
    }
    getCanvas() {
        return this.canvas;
    }
}
//# sourceMappingURL=Game.js.map