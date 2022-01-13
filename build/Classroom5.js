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
<<<<<<< HEAD
        this.npcs.push(new Npc('./assets/img/teacher-blonde-hair-front-faced.png', 714, 98, [
            new Dialog('Welcome to class!#'),
            new Dialog('Did you see my bag anywhere?#'),
=======
        this.npcs.push(new Npc('./assets/img/teacher-blonde-hair-front-faced.png', 714, 198, [
            new Dialog('Heyy how are you today?'),
            new Dialog('Good luck with your exams!'),
>>>>>>> d9c2c3cb50827f948ce404fa4c56a79be1b70a10
        ]));
        this.collectibles.push(new Hint(this.canvas.width / 1.5, this.canvas.height / 3));
        this.doors.push(new Door('./assets/img/door1.png', 985, 485));
        this.player.setXPos(990);
        this.player.setYPos(548);
        this.player.setImage('./assets/img/player-boy-standing.png');
        this.questions.push(new Question(this.player.getUserData(), ' Should you use free Anti-Virus?#', 'No, since the anti-virus can be a virus!#', 'No, since I know what I download!#', 'No, since I do not want to use an anti-virus!#'), new Question(this.player.getUserData(), 'Which of the following is NOT an example of cyberbullying', 'Inviting a friend to fight with you in a game#', 'Creating a fake profile to humiliate someone#', 'Posting or sharing embarrassing photos#'), new Question(this.player.getUserData(), 'What is a predator?#', 'Someone who uses the internet to do harm to others#', 'Someone who shares too much personal information#', 'Someone who regularly surfs the web#'));
        console.log('door5');
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
//# sourceMappingURL=Classroom5.js.map