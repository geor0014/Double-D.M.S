import Room from './Room.js';
export default class DifficultHallway extends Room {
    mainHallway;
    constructor(canvas, mainHallway) {
        super(canvas, './assets/img/easyHallway.jpg');
        this.mainHallway = mainHallway;
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.setXPos(0);
        this.setYPos(this.canvas.height / 4);
        this.player.setXPos(this.player.getImage().width);
    }
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.player.getXPos() <= 0 && this.player.getYPos() <= 433) {
            return this.mainHallway;
        }
        return null;
    }
}
//# sourceMappingURL=DifficultHallway.js.map