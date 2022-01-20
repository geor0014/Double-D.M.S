import Room from './Room.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import Boss from './Boss.js';
import Npc from './Npc.js';
import HappyEnding from './HappyEnding.js';
import SadEnding from './SadEnding.js';
export default class BossRoom extends Room {
    previousScene;
    questions;
    boss;
    bossNpc;
    frameY = 0;
    gameFrame = 0;
    staggerFrame = 11;
    endingScreen = false;
    music;
    constructor(canvas, previousScene, player) {
        super(canvas, './assets/img/bossRoom.png');
        this.previousScene = previousScene;
        this.player = player;
        this.setXPos(0);
        this.setYPos(0);
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.questions = [];
        this.player.setXPos(529);
        this.player.setYPos(639);
        const cNum = this.player.getCharacterNum();
        if (cNum === 1) {
            this.player.setImage('./assets/img/playerBoy1Up.png');
        }
        else if (cNum === 2) {
            this.player.setImage('./assets/img/playerBoy2Up.png');
        }
        else if (cNum === 3) {
            this.player.setImage('./assets/img/playerGirl2Up.png');
        }
        else if (cNum === 4) {
            this.player.setImage('./assets/img/playerGirl1Up.png');
        }
        this.questions.push(new Question(this.player.getUserData(), 'So you finaly made it here...#', 'I am ready to face you!', 'who are you again?', 'whatever...'), new Question(this.player.getUserData(), 'I am your final challange! # before you can even dream of a phone you need to face me!# do you think you can handle this?!#', 'Nothing will stand in my way!', 'I can easily defeat you!', 'whatever...'), new Question(this.player.getUserData(), 'Here are my questions!#', 'okay man..', 'let`s go!', 'whatever...'), new Question(this.player.getUserData(), 'Hey kid, I can make you famous on tiktok# very fast and you can make all your friends jealous!# Send me your address and your mother`s credit card to pay!!#', 'Ignore and delete the message', 'OMG YES, I`ve always wanted to be famous take my money!', 'I dont even like tik-tok'), new Question(this.player.getUserData(), 'How do you make sure that your data is secure enough?#', 'Use a different password for different accounts', 'Use an easy password you can use for every account', 'Use different passwords which are too long'), new Question(this.player.getUserData(), 'Someone hacked into your account, what do you do?#', 'Write the support to get your account back', 'Not do anything', 'Create new account and not use the old one'), new Question(this.player.getUserData(), 'Should you use 2-Factor authentication?#', 'Yes, since the more safety the better!', 'No since my password is strong enough', 'Not always'), new Question(this.player.getUserData(), 'I`m visiting a site from a company or organization that I`ve heard #of. They want my name and phone number so I can enter a contest.# Is it OK to enter?#', 'I should check if it is really them, and ask my parents', 'Yeah I know this company I can trust them', 'No I should never give out information online!'), new Question(this.player.getUserData(), 'I saw you liked my posts and videos and I think youre a cool kid!# Lets hang sometimes and ill give you # free tickets to my show! What do you do? #', 'This is for sure fake, ignore and delete', 'OMG I CANT BELIEVE ITS YOU! I LOVE YOU! IM COMINGGGG!', 'I never liked you anyway..'));
        this.boss = new Boss();
        this.bossNpc = new Npc('./assets/img/emptyBoss.png', 470, 230, []);
        this.music = new Audio('./assets/sound/bossroom.mp3');
        this.music.volume = 0.09;
        setTimeout(() => this.music.play(), 100);
        this.insertHitbox(237, 643, 230, 5, 1);
        this.insertHitbox(478, 689, 150, 5, 1);
        this.insertHitbox(231, 295, 5, 290, 1);
        this.insertHitbox(282, 292, 50, 5, 1);
        this.insertHitbox(336, 90, 5, 155, 1);
        this.insertHitbox(379, 90, 400, 5, 1);
        this.insertHitbox(776, 145, 5, 144, 1);
        this.insertHitbox(820, 293, 40, 5, 1);
        this.insertHitbox(860, 342, 5, 250, 1);
        this.insertHitbox(625, 638, 195, 5, 1);
    }
    update(elapsed) {
        this.gameFrame += 1;
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            if (this.player.collidesWith(this.bossNpc)) {
                this.endingScreen = true;
                return new QuestionScreen(this.canvas, this, this.questions);
            }
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    this.doorClose.play();
                    this.player.setXPos(521);
                    this.player.setYPos(235);
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
                    return this.previousScene;
                }
            }
        }
        if (this.endingScreen) {
            if (this.player.getUserData().getScore() > 17) {
                return new HappyEnding(this.canvas, this.player.getCharacterNum());
            }
            return new SadEnding(this.canvas, this.player.getCharacterNum());
        }
        if (this.gameFrame % this.staggerFrame === 0) {
            if (this.frameY < 3) {
                this.frameY += 1;
            }
            else {
                this.frameY = 0;
            }
            this.boss.setFrameY(this.frameY);
        }
        if (nextScene !== null) {
            return nextScene;
        }
        return null;
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw(this.ctx);
        this.boss.draw(this.ctx);
        this.drawHitBoxes();
        super.render();
    }
}
//# sourceMappingURL=BossRoom.js.map