import Door from './Door.js';
import Classroom from './Classroom.js';
import Candy from './Candy.js';
import Computer from './Computer.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import Npc from './Npc.js';
import Dialog from './Dialog.js';
export default class ClassRoom1 extends Classroom {
    staggerFrame = 8;
    constructor(canvas, previousScene, player, state) {
        super(canvas, previousScene, player, state, './assets/img/classroom.png');
        this.setComputer(new Computer(479, 253));
        this.npcs.push(new Npc('./assets/img/OrangeHairStudentBackFacing.png', 652, 436, [
            new Dialog('Hey, listen...have you seen a doll?#', ['No..', 'You play with dolls?'], ['Oh...', 'not nice!']),
            new Dialog('My little sister lost hers and I am trying to find it.#', ['oh..', 'I can help you find it'], ['I am sad for her', 'Thank you!']),
            new Dialog('If you see it, bring it to me tomorrow, okay?#', ['ok!', 'will do!'], ['Great!', 'Thanks']),
            new Dialog('Class is over, gotta go now. See you tomorrow!#', ['Bye Bye', 'Take care!'], ['', '']),
        ], true), new Npc('./assets/img/BlondeHairTeacherFrontFacing.png', 714, 298, [
            new Dialog('Today we are learning about suspicious links and strangers messeges#', ['ok', 'umm..okay?'], [':)', '^__^']),
            new Dialog('This is very important!#', ['I guess..', 'Sure is!'], ['', '']),
        ]));
        this.collectibles.push(new Candy(this.canvas.width / 2, this.canvas.height / 2));
        this.doors.push(new Door('./assets/img/door1.png', 912, 400.5));
        this.setQuestions([
            new Question(this.player.getUserData(), 'Congratulations you just won a giveaway!# a Nigerian Prince chose you to be the winner!!#Send him your bank account details and your ID to get 500.000€!!', 'Not pay attention and delete this email/message', 'Send an E-mail to make sure it is real', 'YES, TAKE ALL MY DATA!'),
            new Question(this.player.getUserData(), 'Someone sent you a link to a YouTube video,# you click on it and suddenly you have a virus on your pc!# What could u have done differently? ', 'Not click on the link', 'Send this cool link to all my friends!', 'start chatting with this person for fun'),
        ]);
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
        this.renderStars();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    this.doorClose.play();
                    this.player.setXPos(632);
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
    renderStars() {
        this.gameFrame += 1;
        if (this.gameFrame % this.staggerFrame === 0) {
            if (this.frameX < 9) {
                this.frameX += 1;
            }
            else {
                this.frameX = 0;
            }
        }
        this.npcs[0].setFrameX(this.frameX);
    }
}
//# sourceMappingURL=Classroom1.js.map