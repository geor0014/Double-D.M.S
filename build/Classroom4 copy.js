import Door from './Door.js';
import Room from './Room.js';
import Candy from './Candy.js';
import Hint from './Hint.js';
import Computer from './Computer.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
export default class ClassRoom4 extends Room {
    previousScene;
    computer;
    questions;
    constructor(canvas, previousScene, player) {
        super(canvas, './assets/img/classroom.png');
        this.previousScene = previousScene;
        this.player = player;
        this.setXPos(canvas.width / 4);
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
    }
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.player.isInteracting()) {
            this.collectibles.forEach((item) => {
                if (this.player.collidesWith(item)) {
                    this.collectCollectibles();
                    if (item instanceof Candy) {
                        this.player
                            .getUserData()
                            .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
                        console.log(this.player.getUserData().getCandyAmount());
                    }
                    else if (item instanceof Hint) {
                        this.player
                            .getUserData()
                            .setHintAmount(this.player.getUserData().getHintAmount() + 1);
                        console.log(this.player.getUserData().getHintAmount());
                    }
                }
            });
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.doorClose.play();
                    console.log(this.previousScene);
                    this.player.setXPos(729);
                    this.player.setYPos(200);
                    this.player.setImage('./assets/img/player-boy-standing.png');
                    return this.previousScene;
                }
            }
            if (this.player.collidesWith(this.computer)) {
                return new QuestionScreen(this.canvas, this, this.questions);
            }
        }
        return null;
    }
    render() {
        this.draw(this.ctx);
        this.computer.draw(this.ctx);
        super.render();
    }
}
//# sourceMappingURL=Classroom4%20copy.js.map