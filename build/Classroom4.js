import Door from './Door.js';
import Room from './Room.js';
import Computer from './Computer.js';
import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
export default class ClassRoom4 extends Room {
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
        this.questions.push(new Question(this.player.getUserData(), 'I met someone in a chat room who wants to get together. #They live nearby. Should I go?', 'I should ask my parent about this and decide with them#', 'Yes, it is always nice to have a new friend!#', 'Talking to people online is wrong!# '), new Question(this.player.getUserData(), 'Hey man! I just lost my account data for my Fortnite account# Do you think you could send me your password and username# so I can play with yours because all my skins are gone :((', 'Report that person#', 'Send them wrong data#', 'Send password and username since you feel bad for them#'), new Question(this.player.getUserData(), 'You need to create a password for a website.# What should you use?#', 'A random word, number, and symbols (e.g. 1cecr3am!)#', 'A nickname (e.g jumpingjacks)#', 'Your name and the year you were born (e.g. jack2011)#'));
        console.log('door4');
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.doorClose.play();
                    console.log(this.previousScene);
                    this.player.setXPos(343);
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
//# sourceMappingURL=Classroom4.js.map