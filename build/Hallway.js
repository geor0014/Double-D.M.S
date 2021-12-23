import Room from './Room.js';
import Door from './Door.js';
import Npc from './Npc.js';
import Candy from './Candy.js';
import Hint from './Hint.js';
import ClassRoom1 from './Classroom1.js';
import DialogScreen from './DialogScreen.js';
export default class Hallway extends Room {
    constructor(canvas) {
        super(canvas, './assets/img/hallway.png');
        this.setXPos(50);
        this.setYPos(30);
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.collectibles.push(new Candy(this.canvas.width / 2, this.canvas.height / 2));
        this.collectibles.push(new Hint(this.canvas.width / 3, this.canvas.height / 1.5));
        this.doors.push(new Door('./assets/img/door1.png', 732, 130));
        this.npcs.push(new Npc('./assets/img/teacher-front.png', (this.canvas.width / 2), (this.canvas.height - 500)));
        console.log('hi');
    }
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.player.isInteracting()) {
            this.collectibles.forEach((item) => {
                if (this.player.collidesWith(item)) {
                    this.collectCollectibles();
                }
            });
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.doorOpen.play();
                    return (new ClassRoom1(this.canvas));
                }
            }
            for (let i = 0; i < this.npcs.length; i += 1) {
                if (this.player.collidesWith(this.npcs[i])) {
                    console.log('interact with npc');
                    return (new DialogScreen(this.canvas, this));
                }
            }
        }
        return null;
    }
}
//# sourceMappingURL=Hallway.js.map