import Room from './Room.js';
import Door from './Door.js';
import ClassRoom4 from './Classroom4.js';
import ClassRoom5 from './Classroom5.js';
import ClassRoom6 from './Classroom6.js';
import Dialog from './Dialog.js';
import Npc from './Npc.js';
import QuestItem from './QuestItem.js';
export default class DifficultHallway extends Room {
    mainHallway;
    room4Interact;
    room5Interact;
    room6Interact;
    class4;
    class5;
    class6;
    doll = new QuestItem('doll', './assets/img/doll.png', 907, 474.5);
    pushOnce = true;
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
        this.npcs.push(new Npc('./assets/img/student-grey-hair-back-faced.png', 597, 500, [
            new Dialog('I heard there is this weird dude in the bathroom#'),
            new Dialog('I am too scared to go there#'),
        ]), new Npc('./assets/img/student-blue-hair-faced.png', 432, 322, [
            new Dialog('Hey there! Have you seen a teddy bear around here?#'),
            new Dialog('I lost mine. If you see it, can you bring it to me tomorrow?#'),
        ]));
        this.player.setXPos(13);
        this.player.setYPos(335);
        this.doors.push(new Door('./assets/img/door1.png', 290, 228.5));
        this.doors.push(new Door('./assets/img/door1.png', 460, 228.5));
        this.doors.push(new Door('./assets/img/door1.png', 650, 228.5));
        this.insertHitbox(10, 10, 10, 10);
    }
    addQuestItems() {
        if (this.pushOnce === true) {
            this.player
                .getUserData()
                .getQuests()
                .forEach((quest) => {
                if (quest === 'Help find doll') {
                    this.player.getUserData().getQuestItems().push(this.doll);
                    this.pushOnce = false;
                }
            });
        }
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        const cNum = this.player.getCharacterNum();
        if (this.player.getXPos() <= 12 && this.player.getYPos() >= 334.5) {
            this.player.setXPos(1060);
            this.player.setYPos(443.5);
            if (cNum === 1) {
                this.player.setImage('./assets/img/player-boy1-left.png');
            }
            else if (cNum === 2) {
                this.player.setImage('./assets/img/player-boy2-left.png');
            }
            else if (cNum === 3) {
                this.player.setImage('./assets/img/player-girl2-left.png');
            }
            else if (cNum === 4) {
                this.player.setImage('./assets/img/player-girl1-left.png');
            }
            return this.mainHallway;
        }
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
<<<<<<< HEAD
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
=======
                    this.player.setXPos(911);
                    this.player.setYPos(473);
                    this.player.setImage('./assets/img/player-boy-standing.png');
>>>>>>> 8a8630a1189db8f7ca7a224c22a6cae82d13d694
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
        this.addQuestItems();
        if (nextScene !== null) {
            return nextScene;
        }
        return null;
    }
    render() {
        this.draw(this.ctx);
        this.player
            .getUserData()
            .getQuestItems()
            .forEach((item) => {
            if (item.getName() === 'doll')
                item.draw(this.ctx);
        });
        super.render();
    }
}
//# sourceMappingURL=DifficultHallway.js.map