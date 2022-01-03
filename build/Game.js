import GameLoop from './GameLoop.js';
import StartScreen from './StartScreen.js';
import UserData from './UserData.js';
export default class Game {
    canvas;
    gameLoop;
    userData;
    constructor(canvas) {
        this.canvas = canvas;
        this.userData = new UserData();
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