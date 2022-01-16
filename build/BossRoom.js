import Door from './Door.js';
import Room from './Room.js';
import Question from './Question.js';
import Boss from './Boss.js';
export default class BossRoom extends Room {
    previousScene;
    questions;
    boss;
    frameY = 0;
    gameFrame = 0;
    staggerFrame = 11;
    constructor(canvas, previousScene, player) {
        super(canvas, './assets/img/boss-room.png');
        this.previousScene = previousScene;
        this.player = player;
        this.setXPos(0);
        this.setYPos(0);
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.questions = [];
        this.doors.push(new Door('./assets/img/door1.png', 677, 297));
        this.player.setXPos(566);
        this.player.setYPos(305);
        this.player.setImage('./assets/img/player-boy-standing.png');
        this.questions.push(new Question(this.player.getUserData(), 'text question 1', 'right answer 1', 'wrong answer 1.1', 'wrong answer 1.2'));
        this.questions.push(new Question(this.player.getUserData(), 'text question 2', 'right answer 2', 'wrong answer 2.1', 'wrong answer 2.2'));
        this.boss = new Boss();
    }
    update(elapsed) {
        this.gameFrame += 1;
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.doorClose.play();
                    console.log(this.previousScene);
                    this.player.setXPos(521);
                    this.player.setYPos(235);
                    this.player.setImage('./assets/img/player-boy-standing.png');
                    return this.previousScene;
                }
            }
        }
        if (this.gameFrame % this.staggerFrame === 0) {
            if (this.frameY < 3) {
                this.frameY += 1;
            }
            else {
                this.frameY = 0;
            }
            this.boss.setFrameY(this.frameY);
        }
        if (nextScene !== null) {
            return nextScene;
        }
        return null;
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw(this.ctx);
        this.boss.draw(this.ctx);
        super.render();
    }
}
//# sourceMappingURL=BossRoom.js.map