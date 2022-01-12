import Door from './Door.js';
import Room from './Room.js';
import Candy from './Candy.js';
import Computer from './Computer.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import HintScreen from './HintScreen.js';
import Boss from './Boss.js';
export default class BossRoom extends Room {
    previousScene;
    computer;
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
        this.computer = new Computer(618, 113);
        this.collectibles.push(new Candy(this.canvas.width / 2, this.canvas.height / 2));
        this.doors.push(new Door('./assets/img/door1.png', 864, 300));
        this.player.setXPos(861);
        this.player.setYPos(365);
        this.player.setImage('./assets/img/player-boy-standing.png');
        this.questions.push(new Question('text question 1', 'right answer 1', 'wrong answer 1.1', 'wrong answer 1.2'));
        this.questions.push(new Question('text question 2', 'right answer 2', 'wrong answer 2.1', 'wrong answer 2.2'));
        this.boss = new Boss();
    }
    update(elapsed) {
        this.gameFrame += 1;
        this.generalInteraction();
        if (this.player.isReadingHint()
            && this.player.getUserData().getHintAmount() > 0) {
            this.player
                .getUserData()
                .setHintAmount(this.player.getUserData().getHintAmount() - 1);
            console.log(this.player.getUserData().getHintAmount());
            return new HintScreen(this.canvas, this, 2);
        }
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.doorClose.play();
                    console.log(this.previousScene);
                    this.player.setXPos(732);
                    this.player.setYPos(200);
                    this.player.setImage('./assets/img/player-boy-standing.png');
                    return this.previousScene;
                }
            }
            if (this.player.collidesWith(this.computer)) {
                return new QuestionScreen(this.canvas, this, this.questions);
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
        return null;
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw(this.ctx);
        this.boss.draw(this.ctx);
        this.computer.draw(this.ctx);
        super.render();
    }
}
//# sourceMappingURL=BossRoom.js.map