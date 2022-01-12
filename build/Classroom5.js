import Door from './Door.js';
import Room from './Room.js';
import Candy from './Candy.js';
import Computer from './Computer.js';
import QuestionScreen from './QuestionScreen.js';
import Npc from './Npc.js';
import Dialog from './Dialog.js';
export default class ClassRoom5 extends Room {
    previousScene;
    computer;
    questions;
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
        this.npcs.push(new Npc('./assets/img/teacher-blonde-hair-front-faced.png', 714, 98, [
            new Dialog('Heyy how are you today?'),
            new Dialog('Good luck with your exams!'),
        ]));
        this.collectibles.push(new Candy(this.canvas.width / 2, this.canvas.height / 2));
        this.doors.push(new Door('./assets/img/door1.png', 985, 485));
        this.player.setXPos(990);
        this.player.setYPos(548);
        this.player.setImage('./assets/img/player-boy-standing.png');
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
                return new QuestionScreen(this.canvas, this, this.questions);
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