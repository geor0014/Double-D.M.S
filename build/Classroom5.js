import Door from './Door.js';
import Room from './Room.js';
import Hint from './Hint.js';
import Computer from './Computer.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import Npc from './Npc.js';
import Dialog from './Dialog.js';
export default class ClassRoom5 extends Room {
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
        this.npcs.push(new Npc('./assets/img/teacher-blonde-hair-front-faced.png', 714, 198, [
            new Dialog('You should take a break sometimes#', ['Yes Im tired', 'I am okay'], ['Studying can be hard', 'good to know!']),
            new Dialog('The cafeteria has great food!#', ['Ill check it out!', 'I am hungry..'], ['', '']),
        ]));
        this.collectibles.push(new Hint(this.canvas.width / 1.5, this.canvas.height / 3));
        this.doors.push(new Door('./assets/img/door1.png', 912, 400.5));
        this.questions.push(new Question(this.player.getUserData(), ' Should you use free Anti-Virus?#', 'No, since the anti-virus can be a virus!', 'No, since I know what I download!', 'No, since I do not want to use an anti-virus!'), new Question(this.player.getUserData(), 'Which of the following is NOT an example of cyberbullying?#', 'Inviting a friend to fight with you in a game', 'Creating a fake profile to humiliate someone', 'Posting or sharing embarrassing photos'), new Question(this.player.getUserData(), 'What is a predator?#', 'Someone who uses the internet to do harm to others', 'Someone who shares too much personal information', 'Someone who regularly surfs the web'));
        this.insertHitbox(10, 10, 10, 10);
        console.log('CLASSROOM5');
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.doorClose.play();
                    console.log(this.previousScene);
                    this.player.setXPos(493);
                    this.player.setYPos(350);
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
    }
}
//# sourceMappingURL=Classroom5.js.map