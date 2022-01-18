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
    room1Interact;
    room2Interact;
    room3Interact;
    class1;
    class2;
    class3;
    constructor(canvas, mainHallway, player) {
        super(canvas, './assets/img/easyHallway.png');
        console.log('creating easy hallway');
        this.room1Interact = false;
        this.room2Interact = false;
        this.room3Interact = false;
        this.mainHallway = mainHallway;
        this.player = player;
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.setXPos(0);
        this.setYPos(0);
        this.collectibles.push(new Hint(this.canvas.width / 3, this.canvas.height / 3));
        this.npcs.push(new Npc('./assets/img/student-1-back-faced.png', 561, 405, [
            new Dialog('Hello, I lost my backpack....#'),
            new Dialog('Can you please look for it and bring it back to me tomorrow?#'),
        ]), new Npc('./assets/img/student-black-haired-left-faced.png', 50, this.canvas.height - 400, [
            new Dialog('There are some things you should never share!#'),
            new Dialog('I hope she will not be bullied#'),
        ]), new Npc('./assets/img/student-red-right-faced.png', 0, this.canvas.height - 400, [
            new Dialog('Did you hear about Jessica?#'),
            new Dialog('Cant believe she shared that picture :O#'),
        ]));
        this.player.setXPos(1055);
        this.player.setYPos(351.5);
        this.doors.push(new Door('./assets/img/door1.png', 632, 238.5));
        this.doors.push(new Door('./assets/img/door1.png', 500, 238.5));
        this.doors.push(new Door('./assets/img/door1.png', 334, 238.5));
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
        const cNum = this.player.getCharacterNum();
        if (this.player.getXPos() >= 1060 && this.player.getYPos() >= 309.5) {
            this.player.setXPos(14);
            this.player.setYPos(443.5);
            if (cNum === 1) {
                this.player.setImage('./assets/img/player-boy1-right.png');
            }
            else if (cNum === 2) {
                this.player.setImage('./assets/img/player-boy2-right.png');
            }
            else if (cNum === 3) {
                this.player.setImage('./assets/img/player-girl2-right.png');
            }
            else if (cNum === 4) {
                this.player.setImage('./assets/img/player-girl1-right.png');
            }
            console.log('main halwway return');
            return this.mainHallway;
        }
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.player.setXPos(990);
                    this.player.setYPos(548);
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
                    this.doorOpen.play();
                    if (i === 0) {
                        if (this.room1Interact === false) {
                            this.class1 = new ClassRoom1(this.canvas, this, this.player, this.isMenuShowing);
                            this.room1Interact = true;
                        }
                        return this.class1;
                    }
                    if (i === 1) {
                        if (this.room2Interact === false) {
                            this.class2 = new ClassRoom2(this.canvas, this, this.player, this.isMenuShowing);
                            this.room2Interact = true;
                        }
                        return this.class2;
                    }
                    if (i === 2) {
                        if (this.room3Interact === false) {
                            this.class3 = new ClassRoom3(this.canvas, this, this.player, this.isMenuShowing);
                            this.room3Interact = true;
                        }
                        return this.class3;
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