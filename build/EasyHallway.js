import Room from './Room.js';
import Door from './Door.js';
import ClassRoom1 from './Classroom1.js';
import ClassRoom2 from './Classroom2.js';
import ClassRoom3 from './Classroom3.js';
import Dialog from './Dialog.js';
import Npc from './Npc.js';
import Hint from './Hint.js';
export default class EasyHallway extends Room {
    mainHallway;
    constructor(canvas, mainHallway, player) {
        super(canvas, './assets/img/easyHallway.png');
        console.log('creating easy hallway');
        this.mainHallway = mainHallway;
        this.player = player;
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.setXPos(0);
        this.setYPos(0);
        this.collectibles.push(new Hint(this.canvas.width / 3, this.canvas.height / 3));
        this.npcs.push(new Npc('./assets/img/student-1-back-faced.png', 561, 405, [
            new Dialog('I dont feel like studying today,#'),
            new Dialog('I want to sleep...#'),
        ]), new Npc('./assets/img/student-black-haired-left-faced.png', 50, this.canvas.height - 400, [
            new Dialog('There are some things you should never share!#'),
            new Dialog('I hope she will not be bullied#'),
        ]), new Npc('./assets/img/student-red-right-faced.png', 0, this.canvas.height - 400, [
            new Dialog('Did you hear about Jessica?#'),
            new Dialog('Cant believe she shared that picture :O#'),
        ]));
        this.doors.push(new Door('./assets/img/door1.png', 632, 238.5));
        this.doors.push(new Door('./assets/img/door1.png', 500, 238.5));
        this.doors.push(new Door('./assets/img/door1.png', 334, 238.5));
        this.player.setXPos(1055);
        this.player.setYPos(351.5);
    }
    processInput() {
        if (this.player.getYPos() > 267.5 && this.player.getYPos() < 407.5) {
            this.player.movePlayer(this.canvas);
            if (this.player.getYPos() <= 267.5) {
                this.player.setYPos(270);
            }
            if (this.player.getYPos() >= 407.5) {
                this.player.setYPos(406);
            }
        }
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.getXPos() >= 1060 && this.player.getYPos() >= 309.5) {
            this.player.setXPos(14);
            this.player.setYPos(443.5);
            this.player.setImage('./assets/img/player-boy-right.png');
            console.log('main halwway return');
            return this.mainHallway;
        }
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.doorOpen.play();
                    if (i === 0) {
                        return new ClassRoom1(this.canvas, this, this.player, this.isMenuShowing);
                    }
                    if (i === 1) {
                        return new ClassRoom2(this.canvas, this, this.player, this.isMenuShowing);
                    }
                    if (i === 2) {
                        return new ClassRoom3(this.canvas, this, this.player, this.isMenuShowing);
                    }
                }
            }
        }
        if (nextScene !== null) {
            return nextScene;
        }
        return null;
    }
    render() {
        this.draw(this.ctx);
        super.render();
    }
}
//# sourceMappingURL=EasyHallway.js.map