import Door from './Door.js';
import Hint from './Hint.js';
import Computer from './Computer.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import QuestItem from './QuestItem.js';
import Classroom from './Classroom.js';
export default class ClassRoom2 extends Classroom {
    teddy = new QuestItem('teddy', './assets/img/teddy.png', 263, 480);
    pushOnce = true;
    constructor(canvas, previousScene, player, state) {
        super(canvas, previousScene, player, state, './assets/img/scienceclass.png');
        this.setComputer(new Computer(476, 247));
        this.getCollectibles().push(new Hint(this.canvas.width / 2 - 100, this.canvas.height / 2 - 70));
        this.getDoors().push(new Door('./assets/img/door1.png', 912, 400.5));
        this.setQuestions([new Question(this.player.getUserData(), 'You are creating an account on your favorite social media.# Before you can access it,#they ask you to accept the general terms of condition!# What do you do?', 'Ask your parents what they think', 'Not read it and accept it', 'Read through everything and decide if you accept'), new Question(this.player.getUserData(), 'Which of these files are safe to download?#', 'Game.exe', 'Virus.exe ', 'Trojan.exe')]);
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
                    this.player.setXPos(450);
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
        this.addQuestItems();
        if (nextScene !== null) {
            return nextScene;
        }
        return null;
    }
    addQuestItems() {
        if (this.pushOnce === true) {
            this.player
                .getUserData()
                .getQuests()
                .forEach((quest) => {
                if (quest === 'Look for Teddy') {
                    this.player.getUserData().getQuestItems().push(this.teddy);
                    this.pushOnce = false;
                }
            });
        }
    }
    render() {
        super.render();
        this.player
            .getUserData()
            .getQuestItems()
            .forEach((item) => {
            if (item.getName() === 'teddy')
                item.draw(this.ctx);
        });
    }
}
//# sourceMappingURL=Classroom2.js.map