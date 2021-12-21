import Scene from './Scene.js';
import Player from './Player.js';
import Garbage from './Garbage.js';
import Egg from './Egg.js';
export default class Level extends Scene {
    player;
    scoringObjects;
    countUntilNextItem;
    randomItem;
    constructor(game) {
        super(game);
        this.scoringObjects = [];
        for (let i = 0; i < Scene.randomNumber(3, 10); i++) {
            this.createRandom();
        }
        this.player = new Player(this.canvas.width - 76, this.canvas.height - 92);
        this.countUntilNextItem = 300;
    }
    processInput() {
        this.player.movePlayer(this.canvas);
    }
    cleanUpGarbage() {
        this.scoringObjects = this.scoringObjects.filter((element) => {
            if (this.player.collidesWith(element)) {
                this.game.userData.addScore(element.getScore());
                return false;
            }
            return true;
        });
    }
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.processInput();
        if (this.player.isCleaning()) {
            this.cleanUpGarbage();
        }
        this.writeTextToCanvas(`Score: ${this.game.userData.getScore()}`, 36, 120, 50);
        if (this.countUntilNextItem === 0) {
            const choice = Scene.randomNumber(0, 10);
            if (choice < 5) {
                this.createRandom();
            }
            this.countUntilNextItem = Scene.randomNumber(120, 240);
        }
        this.countUntilNextItem -= 1;
        return null;
    }
    createRandom() {
        this.randomItem = Scene.randomNumber(1, 2);
        if (this.randomItem === 1) {
            this.scoringObjects.push(new Garbage(this.canvas.width - 32, this.canvas.height - 32));
        }
        else {
            this.scoringObjects.push(new Egg(this.canvas.width - 32, this.canvas.height - 32));
        }
    }
    render() {
        this.scoringObjects.forEach((element) => {
            element.draw(this.ctx);
        });
        this.player.draw(this.ctx);
    }
}
//# sourceMappingURL=Level.js.map