import Door from './Door.js';
import Computer from './Computer.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import Classroom from './Classroom.js';
export default class ClassRoom4 extends Classroom {
    constructor(canvas, previousScene, player, state) {
        super(canvas, previousScene, player, state, './assets/img/scienceClass.png');
        this.setComputer(new Computer(479, 253));
        this.getDoors().push(new Door('./assets/img/door1.png', 912, 400.5));
        this.setQuestions([new Question(this.player.getUserData(), 'I met someone in a chat room who wants to get together. #They live nearby. Should I go?', 'I should ask my parent about this and decide with them', 'Yes, it is always nice to have a new friend!', 'Talking to people online is wrong!'), new Question(this.player.getUserData(), 'Hey man! I just lost my account data for my Fortnite account# Do you think you could send me your password and username# so I can play with yours because all my skins are gone :((', 'Report that person', 'Send them wrong data', 'Send password and username since you feel bad for them'), new Question(this.player.getUserData(), 'You need to create a password for a website.# What should you use?#', 'A random word, number, and symbols (e.g. 1cecr3am!)', 'A nickname (e.g jumpingjacks)', 'Your name and the year you were born (e.g. jack2011)')]);
        this.insertHitbox(911, 563, 50, 5, 1);
        this.insertHitbox(909, 600, 10, 10, 1);
        this.insertHitbox(147, 658, 750, 5, 1);
        this.insertHitbox(194, 107, 5, 500, 1);
        this.insertHitbox(245, 107, 650, 5, 1);
        this.insertHitbox(908, 165, 5, 205, 1);
        this.insertHitbox(953, 359, 5, 150, 1);
        this.insertHitbox(905, 410, 20, 5, 1);
        this.insertHitbox(242, 169, 620, 5, 1);
        this.insertHitbox(380, 370, 35, 240, 1);
        this.insertHitbox(536, 370, 35, 240, 1);
        this.insertHitbox(674, 370, 35, 240, 1);
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.getDoors().length; i += 1) {
                if (this.player.collidesWith(this.getDoors()[i])) {
                    this.getDoorClose().play();
                    this.player.setXPos(290);
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
//# sourceMappingURL=Classroom4.js.map