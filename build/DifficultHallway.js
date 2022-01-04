import Room from './Room.js';
export default class DifficultHallway extends Room {
    mainHallway;
    constructor(canvas, mainHallway, player) {
        super(canvas, './assets/img/easyHallway.jpg');
        console.log('creating difficult hallway');
        this.mainHallway = mainHallway;
        this.player = player;
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
            this.player.setXPos(1368);
            this.player.setYPos(371);
            this.player.setImage('./assets/img/player-boy-left.png');
            return this.mainHallway;
        }
        return null;
    }
}
//# sourceMappingURL=DifficultHallway.js.map