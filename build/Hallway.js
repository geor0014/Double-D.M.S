import Room from './Room.js';
export default class Hallway extends Room {
    constructor(canvas) {
        super(canvas, './assets/img/hallway.png');
        this.setXPos(canvas.width / 4);
        this.setYPos(0);
        this.setImgHeight(canvas.height);
        this.setImgWidth(canvas.width / 2);
        console.log('hi');
    }
}
//# sourceMappingURL=Hallway.js.map