import Door from './Door.js';
import Room from './Room.js';
import Computer from './Computer.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
export default class ClassRoom3 extends Room {
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
        this.doors.push(new Door('./assets/img/door1.png', 985, 485));
        this.player.setXPos(990);
        this.player.setYPos(548);
        this.player.setImage('./assets/img/player-boy-standing.png');
        this.questions.push(new Question(this.player.getUserData(), 'You see the following post:#“Hey look at Timmy`s head, man he looks horrible! Share this video or we will stop talking to you!” # What should you do? ', 'Report it and help poor Timmy', 'Share it I don`t want to be alone', 'Ignore and let it happen '), new Question(this.player.getUserData(), 'My parents and I have established rules as to what I can do on the Internet when Im home,# but Im at a friend`s house. #Should I go by my parents rules or do whatever my friend does?', 'Go by your parents rules', 'Do whatever your friend does ', 'It doesn`t really matter'));
        console.log('CLASSROOM3');
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.doorClose.play();
                    console.log(this.previousScene);
                    this.player.setXPos(334);
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
//# sourceMappingURL=Classroom3.js.map