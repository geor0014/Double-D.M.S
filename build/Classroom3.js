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
        super(canvas, './assets/img/library.png', state);
        this.previousScene = previousScene;
        this.player = player;
        this.setXPos(0);
        this.setYPos(0);
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.questions = [];
        this.computer = new Computer(495, 455);
        this.doors.push(new Door('./assets/img/door1.png', 912, 390));
        this.questions.push(new Question(this.player.getUserData(), 'You see the following post:#“Hey look at Timmy`s head, man he looks horrible! #Share this video or we will stop talking to you!” What will you do? ', 'Report it and help poor Timmy', 'Share it I don`t want to be alone', 'Ignore and let it happen '), new Question(this.player.getUserData(), 'My parents and I have established rules as to what I can do #on the Internet when Im home, but Im at a friend`s house. #Should I go by my parents rules or do whatever my friend does?', 'Go by your parents rules', 'Do whatever your friend does ', 'It doesn`t really matter'));
        this.insertHitbox(143, 78.5, 715, 160);
        this.insertHitbox(864, 13.5, 100, 10);
        this.insertHitbox(909, 77.5, 45, 250);
        this.insertHitbox(956, 382.5, 10, 140);
        this.insertHitbox(908, 578.5, 45, 100);
        this.insertHitbox(160, 296.5, 45, 300);
        this.insertHitbox(667, 330.5, 185, 150);
        this.insertHitbox(669, 532.5, 185, 150);
        this.insertHitbox(244, 330, 185, 150);
        this.insertHitbox(475, 455.5, 100, 30);
        this.insertHitbox(242, 524.5, 185, 150);
        this.insertHitbox(152, 720.5, 700, 10);
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
                    this.player.setXPos(285);
                    this.player.setYPos(300);
                    const cNum = this.player.getCharacterNum();
                    if (cNum === 1) {
                        this.player.setImage('./assets/img/player-boy1-down.png');
                    }
                    else if (cNum === 2) {
                        this.player.setImage('./assets/img/player-boy2-down.png');
                    }
                    else if (cNum === 3) {
                        this.player.setImage('./assets/img/player-girl2-down.png');
                    }
                    else if (cNum === 4) {
                        this.player.setImage('./assets/img/player-girl1-down.png');
                    }
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
        this.drawHitBoxes();
    }
}
//# sourceMappingURL=Classroom3.js.map