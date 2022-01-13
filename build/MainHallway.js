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
export default class MainHallway extends Room {
    constructor(canvas) {
        super(canvas, './assets/img/hallway.png');
        this.setXPos(0);
        this.setYPos(0);
        this.player = new Player(this.canvas);
        this.player.setXPos(532);
        this.player.setYPos(681.5);
        this.player.setImage('./assets/img/player-boy-up.png');
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.collectibles.push(new Candy(this.canvas.width / 2, this.canvas.height / 2));
        this.collectibles.push(new Hint(this.canvas.width / 3, this.canvas.height / 1.5));
        this.doors.push(new Door('./assets/img/door1.png', 530, 155));
        this.npcs.push(new Npc('./assets/img/teacher-front.png', this.canvas.width / 2, this.canvas.height - 500, [
            new Dialog('Heyy how are you today?#'),
            new Dialog('Good luck with your exams!#'),
        ]));
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.doorOpen.play();
                    return new BossRoom(this.canvas, this, this.player);
                }
            }
        }
        if (this.player.getXPos() <= 14 && this.player.getYPos() >= 443.5) {
            return new EasyHallway(this.canvas, this, this.player);
        }
        if (this.player.getXPos() >= 1060 && this.player.getYPos() >= 443.5) {
            return new DifficultHallway(this.canvas, this, this.player);
        }
        if (nextScene !== null) {
            return nextScene;
        }
        return null;
    }
    render() {
        this.draw(this.ctx);
        super.render();
        this.hitboxes.forEach((box) => {
            box.draw(this.canvas);
        });
    }
}
//# sourceMappingURL=MainHallway.js.map