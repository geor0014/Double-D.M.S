import UserData from './UserData.js';
import Start from './Start.js';
import GameLoop from './GameLoop.js';
export default class Game {
    randomNumber;
    canvas;
    userData;
    gameLoop;
    constructor(canvas) {
        this.userData = new UserData();
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameLoop = new GameLoop();
        this.gameLoop.start(new Start(this));
    }
    getCanvas() {
        return this.canvas;
    }
}
//# sourceMappingURL=Game.js.map