import Door from './Door.js';
import Hint from './Hint.js';
import Computer from './Computer.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import Npc from './Npc.js';
import Dialog from './Dialog.js';
import Classroom from './Classroom.js';
export default class ClassRoom5 extends Classroom {
    constructor(canvas, previousScene, player, state) {
        super(canvas, previousScene, player, state, './assets/img/classroom.png');
        this.setComputer(new Computer(479, 253));
        this.npcs.push(new Npc('./assets/img/teacherFemaleGlasses.png', 600, 250, [
            new Dialog('You should take a break sometimes#', ['Yes Im tired', 'I am okay'], ['Studying can be hard', 'good to know!']),
            new Dialog('The cafeteria has great food!#', ['Ill check it out!', 'I am hungry..'], ['', '']),
        ]));
        this.collectibles.push(new Hint(this.canvas.width / 1.5, this.canvas.height / 3));
        this.doors.push(new Door('./assets/img/door1.png', 912, 400.5));
        this.setQuestions([new Question(this.player.getUserData(), ' Should you use free Anti-Virus?#', 'No, since the anti-virus can be a virus!', 'No, since I know what I download!', 'No, since I do not want to use an anti-virus!'), new Question(this.player.getUserData(), 'Which of the following is NOT an example of cyberbullying?#', 'Inviting a friend to fight with you in a game', 'Creating a fake profile to humiliate someone', 'Posting or sharing embarrassing photos'), new Question(this.player.getUserData(), 'What is a predator?#', 'Someone who uses the internet to do harm to others', 'Someone who shares too much personal information', 'Someone who regularly surfs the web')]);
        this.insertHitbox(911, 563, 50, 5, 1);
        this.insertHitbox(909, 600, 10, 10, 1);
        this.insertHitbox(147, 658, 750, 5, 1);
        this.insertHitbox(194, 107, 5, 500, 1);
        this.insertHitbox(245, 107, 650, 5, 1);
        this.insertHitbox(908, 165, 5, 205, 1);
        this.insertHitbox(953, 359, 5, 150, 1);
        this.insertHitbox(905, 410, 20, 5, 1);
        this.insertHitbox(242, 169, 620, 5, 1);
        this.insertHitbox(286, 313, 35, 270, 1);
        this.insertHitbox(386, 313, 35, 270, 1);
        this.insertHitbox(674, 313, 35, 270, 1);
        this.insertHitbox(774, 313, 35, 270, 1);
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    this.doorClose.play();
                    this.player.setXPos(460);
                    this.player.setYPos(300);
                    const cNum = this.player.getCharacterNum();
                    if (cNum === 1) {
                        this.player.setImage('./assets/img/PlayerBoy1Down.png');
                    }
                    else if (cNum === 2) {
                        this.player.setImage('./assets/img/playerBoy2Down.png');
                    }
                    else if (cNum === 3) {
                        this.player.setImage('./assets/img/playerGirl2Down.png');
                    }
                    else if (cNum === 4) {
                        this.player.setImage('./assets/img/playerGirl1Down.png');
                    }
                    return this.getPreviousScene();
                }
            }
            if (this.player.collidesWith(this.getComputer())) {
                if (this.getPcInteract() === false) {
                    this.setPcInteract(true);
                    return new QuestionScreen(this.canvas, this, this.getQuestions());
                }
            }
        }
        if (nextScene !== null) {
            return nextScene;
        }
        return null;
    }
}
//# sourceMappingURL=Classroom5.js.map