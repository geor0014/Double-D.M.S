import KeyListener from './KeyListener.js';
import GameItem from './GameItem.js';
export default class Player extends GameItem {
    xVelocity;
    yVelocity;
    keyboard;
    constructor(maxX, maxY) {
        super('./assets/img/character_robot_walk0.png', maxX, maxY);
        this.xVelocity = 3;
        this.yVelocity = 3;
        this.keyboard = new KeyListener();
    }
    movePlayer(canvas) {
        if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)
            && this.xPos + this.img.width < canvas.width) {
            this.xPos += this.xVelocity;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT)
            && this.xPos > 0) {
            this.xPos -= this.xVelocity;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_UP)
            && this.yPos > 0) {
            this.yPos -= this.yVelocity;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_DOWN)
            && this.yPos + this.img.height < canvas.height) {
            this.yPos += this.yVelocity;
        }
    }
    isCleaning() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
            return true;
        }
        return false;
    }
    collidesWith(other) {
        if (this.xPos < other.getXPos() + other.getImageWidth()
            && this.xPos + this.img.width > other.getXPos()
            && this.yPos < other.getYPos() + other.getImageHeight()
            && this.yPos + this.img.height > other.getYPos()) {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=Player.js.map