import Room from './Room.js';
import Door from './Door.js';
import ClassRoom1 from './Classroom1.js';
import ClassRoom2 from './Classroom2.js';
import ClassRoom3 from './Classroom3.js';
import HintScreen from './HintScreen.js';
import Npc from './Npc.js';
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
        this.npcs.push(new Npc('./assets/img/student-1-back-faced.png', 561, 630));
        this.npcs.push(new Npc('./assets/img/student-black-haired-left-faced.png', 50, this.canvas.height - 400));
        this.npcs.push(new Npc('./assets/img/student-red-right-faced.png', 0, this.canvas.height - 400));
        this.doors.push(new Door('./assets/img/door1.png', 732, 130));
        this.doors.push(new Door('./assets/img/door1.png', 532, 130));
        this.doors.push(new Door('./assets/img/door1.png', 332, 130));
        this.player.setXPos(this.canvas.width / 2);
    }
    update(elapsed) {
        this.generalInteraction();
        if (this.player.getXPos() >= 1060 && this.player.getYPos() >= 443.5) {
            this.player.setXPos(14);
            this.player.setYPos(443.5);
            this.player.setImage('./assets/img/player-boy-right.png');
            console.log('main halwway return');
            return this.mainHallway;
        }
        if (this.player.isReadingHint()
            && this.player.getUserData().getHintAmount() > 0) {
            this.player
                .getUserData()
                .setHintAmount(this.player.getUserData().getHintAmount() - 1);
            console.log(this.player.getUserData().getHintAmount());
            return new HintScreen(this.canvas, this, 2);
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
            for (let i = 0; i < this.npcs.length; i += 1) {
                if (this.player.collidesWith(this.npcs[i])) {
                    console.log('interact with npc');
                    this.player.setXPos(this.player.getXPos() - 50);
                    this.player.setYPos(this.player.getYPos() + 50);
                }
            }
        }
        return null;
    }
    render() {
        this.draw(this.ctx);
        super.render();
    }
}
//# sourceMappingURL=EasyHallway.js.map