import Room from './Room.js';
import Door from './Door.js';
import Npc from './Npc.js';
import Candy from './Candy.js';
import Hint from './Hint.js';
import EasyHallway from './EasyHallway.js';
import DifficultHallway from './DifficultHallway.js';
import Player from './Player.js';
import BossRoom from './BossRoom.js';
import Dialog from './Dialog.js';
import QuestItem from './QuestItem.js';
export default class MainHallway extends Room {
    bRoomInteract;
    bossRoom;
    eHallInteract;
    easyHall;
    dHallInteract;
    diffHall;
    backpack;
    pushOnce = true;
    textToPresent = '';
    constructor(canvas, charaterNum) {
        super(canvas, './assets/img/hallway.png');
        this.bRoomInteract = false;
        this.eHallInteract = false;
        this.dHallInteract = false;
        this.setXPos(0);
        this.setYPos(0);
        this.player = new Player(this.canvas, charaterNum);
        this.player.setXPos(532);
        this.player.setYPos(681.5);
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.collectibles.push(new Candy(312, 276.5), new Hint(this.canvas.width / 3, this.canvas.height / 1.5));
        this.doors.push(new Door('./assets/img/boss-room-door-closed.png', 511, 412));
        this.npcs.push(new Npc('./assets/img/teacher-front.png', 782, 315.5, [
            new Dialog('Heyy how are you today?#', ['Good Thank you!', 'Excited for my birthday!'], ['Glad to hear that', 'Happy Birthday!']),
            new Dialog('Good luck with your exams!#', ['Thanks!', 'Thank you'], ['', '']),
        ]));
        this.backpack = new QuestItem('backpack', './assets/img/backpack.png', 682, 318.5);
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    if (this.player.getUserData().getScore() > -1) {
                        console.log('interact with door');
                        this.doorOpen.play();
                        if (this.bRoomInteract === false) {
                            this.bossRoom = new BossRoom(this.canvas, this, this.player);
                            this.bRoomInteract = true;
                        }
                        return this.bossRoom;
                    }
                    this.textToPresent =
                        'You cant access this room! maybe youre not worthy enough (evil laugh)';
                }
            }
        }
        if (this.player.getXPos() <= 162 && this.player.getYPos() >= 413.5) {
            if (this.eHallInteract === false) {
                this.easyHall = new EasyHallway(this.canvas, this, this.player);
                this.eHallInteract = true;
            }
            this.player.setXPos(967);
            this.player.setYPos(358);
            return this.easyHall;
        }
        if (this.player.getXPos() >= 909 && this.player.getYPos() >= 402.5) {
            if (this.player.getUserData().getScore() > -1) {
                if (this.dHallInteract === false) {
                    this.diffHall = new DifficultHallway(this.canvas, this, this.player);
                    this.dHallInteract = true;
                }
                this.player.setXPos(13);
                this.player.setYPos(335);
                return this.diffHall;
            }
            this.textToPresent =
                'Sorry you cant enter here yet you need at least 4 points!';
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
                if (quest === 'Find backpack') {
                    this.player.getUserData().getQuestItems().push(this.backpack);
                    this.pushOnce = false;
                }
            });
        }
    }
    render() {
        this.draw(this.ctx);
        this.player
            .getUserData()
            .getQuestItems()
            .forEach((item) => {
            if (item.getName() === 'backpack')
                item.draw(this.ctx);
        });
        super.render();
        this.drawHitBoxes();
        this.writeTextToCanvas(this.textToPresent, 24, this.canvas.width / 2, 75, 'center', 'red');
        this.textToPresent = '';
    }
}
//# sourceMappingURL=MainHallway.js.map