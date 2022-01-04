import Room from './Room.js';
export default class EasyHallway extends Room {
    mainHallway;
    constructor(canvas, mainHallway, player) {
        super(canvas, './assets/img/easyHallway.jpg');
        console.log('creating easy hallway');
        this.mainHallway = mainHallway;
        this.player = player;
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.setXPos(0);
        this.setYPos(this.canvas.height / 4);
        this.player.setXPos(this.canvas.width / 2);
    }
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.player.getXPos() >= 1450 && this.player.getYPos() <= 433) {
            this.player.setXPos(132);
            this.player.setYPos(371);
            this.player.setImage('./assets/img/player-boy-right.png');
            console.log('main halwway return');
            return this.mainHallway;
        }
        return null;
    }
}
//# sourceMappingURL=EasyHallway.js.map