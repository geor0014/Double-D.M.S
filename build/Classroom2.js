import Door from './Door.js';
import Room from './Room.js';
import Hint from './Hint.js';
import Computer from './Computer.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
export default class ClassRoom2 extends Room {
    previousScene;
    computer;
    questions;
    pcInteract = false;
    constructor(canvas, previousScene, player, state) {
        super(canvas, './assets/img/classroom.png', state);
        this.previousScene = previousScene;
        this.player = player;
        this.setXPos(0);
        this.setYPos(0);
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.questions = [];
        this.computer = new Computer(266, 165.5);
        this.collectibles.push(new Hint(this.canvas.width / 2 - 100, this.canvas.height / 2 - 70));
        this.doors.push(new Door('./assets/img/door1.png', 985, 485));
        this.player.setXPos(990);
        this.player.setYPos(548);
        this.player.setImage('./assets/img/player-boy-standing.png');
        this.questions.push(new Question(this.player.getUserData(), 'You are creating an account on your favorite social media.# Before you can access it,#they ask you to accept the general terms of condition!# What do you do?', 'Ask your parents what they think', 'Not read it and accept it', 'Read through everything and decide if you accept or not'), new Question(this.player.getUserData(), 'Which of these files are safe to download?#', 'Game.exe', 'Virus.exe ', 'Trojan.exe'));
        console.log('CLASSROOM2');
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.doorClose.play();
                    console.log(this.previousScene);
                    this.player.setXPos(500);
                    this.player.setYPos(350);
                    this.player.setImage('./assets/img/player-boy-standing.png');
                    return this.previousScene;
                }
            }
            if (this.player.collidesWith(this.computer)) {
                if (this.pcInteract === false) {
                    this.pcInteract = true;
                    return new QuestionScreen(this.canvas, this, this.questions);
                }
                console.log('cant use the pc at the moment');
            }
        }
        if (nextScene !== null) {
            return nextScene;
        }
        return null;
    }
    render() {
        this.draw(this.ctx);
        this.computer.draw(this.ctx);
        super.render();
    }
}
//# sourceMappingURL=Classroom2.js.map