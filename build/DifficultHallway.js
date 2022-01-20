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
    doll;
    pushOnce;
    staggerFrame = 8;
    constructor(canvas, mainHallway, player) {
        super(canvas, './assets/img/difficultHallway.png');
        this.room4Interact = false;
        this.room5Interact = false;
        this.room6Interact = false;
        this.pushOnce = true;
        this.mainHallway = mainHallway;
        this.player = player;
        this.setCollectibles([]);
        this.setNpcs([]);
        this.setDoors([]);
        this.setXPos(0);
        this.setYPos(0);
        this.getNpcs().push(new Npc('./assets/img/snobbyGirl1.png', 532, 300, [
            new Dialog('Hey there! Have you seen a teddy bear around here?#', ['No..', 'Dont think so...'], ['Oh...', 'oh...']),
            new Dialog('I lost mine. If you see it, can you bring it to me tomorrow?#', ['Sure!', 'Yeah why not'], ['', '']),
        ], true), new Npc('./assets/img/pinkLadyUp.png', 597, 500, [
            new Dialog('I heard there is this weird dude in the bathroom#', ['really?', 'oh no...'], ['YES!', 'He is creepy..']),
            new Dialog('I am too scared to go there#', ['Me too!', 'Ill go!'], ['', '']),
        ]));
        this.getDoors().push(new Door('./assets/img/door1.png', 290, 228.5));
        this.getDoors().push(new Door('./assets/img/door1.png', 460, 228.5));
        this.getDoors().push(new Door('./assets/img/door1.png', 650, 228.5));
        this.doll = new QuestItem('doll', './assets/img/doll.png', 930, 471.5);
        this.insertHitbox(105, 305, 150, 5, 1);
        this.insertHitbox(276, 176, 5, 90, 1);
        this.insertHitbox(323, 202, 650, 5, 1);
        this.insertHitbox(1002, 212, 5, 400, 1);
        this.insertHitbox(144, 551, 810, 5, 1);
        this.insertHitbox(99, 453, 41, 5, 1);
        this.insertHitbox(140, 490, 5, 5, 1);
        this.insertHitbox(854, 254, 5, 50, 1);
        this.insertHitbox(889, 345, 50, 5, 1);
        this.insertHitbox(320, 246, 500, 5, 1);
        console.log(this.getNpcs());
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
        this.renderStars();
        if (this.player.getXPos() <= 100 && this.player.getYPos() >= 334.5) {
            this.player.setXPos(900);
            this.player.setYPos(443.5);
            if (cNum === 1) {
                this.player.setImage('./assets/img/PlayerBoy1Left.png');
            }
            else if (cNum === 2) {
                this.player.setImage('./assets/img/playerBoy2Left.png');
            }
            else if (cNum === 3) {
                this.player.setImage('./assets/img/playerGirl2Left.png');
            }
            else if (cNum === 4) {
                this.player.setImage('./assets/img/playerGirl1Left.png');
            }
            return this.mainHallway;
        }
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.getDoors().length; i += 1) {
                if (this.player.collidesWith(this.getDoors()[i])) {
                    this.player.setXPos(911);
                    this.player.setYPos(473);
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
                    this.getDoorOpen().play();
                    if (i === 0) {
                        if (this.room4Interact === false) {
                            this.class4 = new ClassRoom4(this.canvas, this, this.player, this.getIsMenuShowing());
                            this.room4Interact = true;
                        }
                        return this.class4;
                    }
                    if (i === 1) {
                        if (this.room5Interact === false) {
                            this.class5 = new ClassRoom5(this.canvas, this, this.player, this.getIsMenuShowing());
                            this.room5Interact = true;
                        }
                        return this.class5;
                    }
                    if (i === 2) {
                        if (this.room6Interact === false) {
                            this.class6 = new ClassRoom6(this.canvas, this, this.player, this.getIsMenuShowing());
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
        this.drawHitBoxes();
    }
    renderStars() {
        this.setGameFrame(this.getGameFrame() + 1);
        if (this.getGameFrame() % this.staggerFrame === 0) {
            if (this.getFrameX() < 9) {
                this.setFrameX(this.getFrameX() + 1);
            }
            else {
                this.setFrameX(0);
            }
        }
        this.getNpcs()[0].setFrameX(this.getFrameX());
    }
}
//# sourceMappingURL=DifficultHallway.js.map