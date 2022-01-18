import Scene from './Scene.js';
export default class Screen extends Scene {
    img;
    xPos;
    yPos;
    constructor(canvas, imgSrc) {
        super(canvas);
        this.img = new Image();
        this.img.src = imgSrc;
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    setXPos(xPos) {
        this.xPos = xPos;
    }
    setYPos(yPos) {
        this.yPos = yPos;
    }
    getImage() {
        return this.img;
    }
    setImage(imgSrc) {
        this.img.src = imgSrc;
    }
}
//# sourceMappingURL=Screen.js.map