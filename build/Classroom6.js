import Door from './Door.js';
import Candy from './Candy.js';
import Computer from './Computer.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import Classroom from './Classroom.js';
export default class ClassRoom6 extends Classroom {
    constructor(canvas, previousScene, player, state) {
        super(canvas, previousScene, player, state, './assets/img/artclass.png');
        this.setComputer(new Computer(480, 282));
        this.collectibles.push(new Candy(this.canvas.width / 4, this.canvas.height / 4));
        this.doors.push(new Door('./assets/img/door1.png', 912, 400.5));
        this.setQuestions([new Question(this.player.getUserData(), 'You are about to join this amazing new website# all your friends are there.# What information is OK to give online?#', 'Nickname', 'Phone number', 'Adress'), new Question(this.player.getUserData(), 'You are having trouble doing an activity on a safe site you use at #school. Your friend offers to help but needs your password.# Would you give your password to them.', 'No', 'It depends', 'Yes'), new Question(this.player.getUserData(), 'Your parents want to know what you have been doing on a safe site #you use at school. #Would you let them use your account?', 'You would let them have a look but while youre there', 'Yes, they are my parents I trust them', 'No way, this site is only for kids and teachers')]);
        this.insertHitbox(911, 590, 50, 5, 1);
        this.insertHitbox(909, 640, 10, 10, 1);
        this.insertHitbox(147, 700, 750, 5, 1);
        this.insertHitbox(194, 147, 5, 500, 1);
        this.insertHitbox(245, 244, 620, 5, 1);
        this.insertHitbox(908, 165, 5, 205, 1);
        this.insertHitbox(953, 359, 5, 180, 1);
        this.insertHitbox(905, 410, 20, 5, 1);
        this.insertHitbox(242, 119, 620, 5, 1);
        this.insertHitbox(434, 363, 35, 240, 1);
        this.insertHitbox(626, 363, 35, 240, 1);
        this.insertHitbox(237, 358, 140, 140, 1);
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    this.doorClose.play();
                    this.player.setXPos(650);
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
//# sourceMappingURL=Classroom6.js.map