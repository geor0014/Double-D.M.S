import Door from './Door.js';
import Hallway from './Hallway.js';
import Room from './Room.js';
export default class ClassRoom1 extends Room {
    constructor(canvas) {
        super(canvas, './assets/img/classroom.png');
        this.setXPos(canvas.width / 4);
        this.setYPos(0);
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.doors.push(new Door('./assets/img/door1.png', 864, 300));
        this.player.setXPos(858);
        this.player.setYPos(334);
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
                    return (new Hallway(this.canvas));
                }
            }
        }
        return null;
    }
}
//# sourceMappingURL=Classroom1.js.map