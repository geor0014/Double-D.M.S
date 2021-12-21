import Room from './Room.js';
export default class Hallway extends Room {
    constructor(canvas, player) {
        super(canvas, './assets/img/hallway.png', player);
        this.xPos = canvas.width / 4;
        this.yPos = 0;
        this.imageHeight = canvas.height;
        this.imageWidth = canvas.width / 2;
        console.log('hi');
    }
}
//# sourceMappingURL=Hallway.js.map