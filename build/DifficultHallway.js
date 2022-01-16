import Room from './Room.js';
import Door from './Door.js';
import ClassRoom4 from './Classroom4.js';
import ClassRoom5 from './Classroom5.js';
import ClassRoom6 from './Classroom6.js';
import Dialog from './Dialog.js';
import Npc from './Npc.js';
export default class DifficultHallway extends Room {
    mainHallway;
    room4Interact;
    room5Interact;
    room6Interact;
    class4;
    class5;
    class6;
    constructor(canvas, mainHallway, player) {
        super(canvas, './assets/img/difficultHallway.png');
        console.log('creating difficult hallway');
        this.room4Interact = false;
        this.room5Interact = false;
        this.room6Interact = false;
        this.mainHallway = mainHallway;
        this.player = player;
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.setXPos(0);
        this.setYPos(0);
        this.npcs.push(new Npc('./assets/img/student-grey-hair-back-faced.png', 766, 430, [
            new Dialog('I heard there is this weird dude in the bathroom#'),
            new Dialog('I am too scared to go there#'),
        ]), new Npc('./assets/img/student-blue-hair-faced.png', 432, 322, [
            new Dialog('(3450987 X 19023) + 4.... this is hard!#'),
            new Dialog('Sorry I am busy..#'),
        ]));
        this.player.setXPos(13);
        this.player.setYPos(335);
        this.doors.push(new Door('./assets/img/door1.png', 343, 267));
        this.doors.push(new Door('./assets/img/door1.png', 493, 267));
        this.doors.push(new Door('./assets/img/door1.png', 688, 267));
    }
    processInput() {
        if (this.player.getYPos() > 292 && this.player.getYPos() < 425.5) {
            this.player.movePlayer(this.canvas);
            if (this.player.getYPos() <= 292) {
                this.player.setYPos(294);
            }
            if (this.player.getYPos() >= 425.5) {
                this.player.setYPos(423);
            }
        }
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.getXPos() <= 12 && this.player.getYPos() >= 334.5) {
            this.player.setXPos(1060);
            this.player.setYPos(443.5);
            this.player.setImage('./assets/img/player-boy-left.png');
            return this.mainHallway;
        }
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.player.setXPos(990);
                    this.player.setYPos(548);
                    this.player.setImage('./assets/img/player-boy-standing.png');
                    this.doorOpen.play();
                    if (i === 0) {
                        if (this.room4Interact === false) {
                            this.class4 = new ClassRoom4(this.canvas, this, this.player, this.isMenuShowing);
                            this.room4Interact = true;
                        }
                        return this.class4;
                    }
                    if (i === 1) {
                        if (this.room5Interact === false) {
                            this.class5 = new ClassRoom5(this.canvas, this, this.player, this.isMenuShowing);
                            this.room5Interact = true;
                        }
                        return this.class5;
                    }
                    if (i === 2) {
                        if (this.room6Interact === false) {
                            this.class6 = new ClassRoom6(this.canvas, this, this.player, this.isMenuShowing);
                            this.room6Interact = true;
                        }
                        return this.class6;
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
//# sourceMappingURL=DifficultHallway.js.map