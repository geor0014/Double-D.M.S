import KeyListener from './KeyListener.js';
import GameEntity from './GameEntity.js';
export default class Player extends GameEntity {
    xVelocity;
    yVelocity;
    keyboard;
    constructor(canvas) {
        super('./assets/img/player-boy-standing.png', (canvas.width / 2), canvas.height);
        this.setYPos(-this.getImage().height);
        this.xVelocity = 3;
        this.yVelocity = 3;
        this.keyboard = new KeyListener();
        this.setImageHeight(20);
        this.setImageWidth(24);
    }
    movePlayer(canvas) {
        if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)
            && this.getXPos() + this.getImage().width < canvas.width) {
            this.setXPos(this.xVelocity);
            this.setImage('./assets/img/player-boy-right.png');
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT)
            && this.getXPos() > 0) {
            this.setXPos(-this.xVelocity);
            this.setImage('./assets/img/player-boy-left.png');
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_UP)
            && this.getYPos() > 0) {
            this.setYPos(-this.yVelocity);
            this.setImage('./assets/img/player-boy-up.png');
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_DOWN)
            && this.getYPos() + this.getImage().height < canvas.height) {
            this.setYPos(this.yVelocity);
            this.setImage('./assets/img/player-boy-standing.png');
        }
    }
    isInteracting() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
            return true;
        }
        return false;
    }
    collidesWith(other) {
        if (this.getXPos() < other.getXPos() + other.getImage().width
            && this.getXPos() + this.getImage().width > other.getXPos()
            && this.getYPos() < other.getYPos() + other.getImage().height
            && this.getYPos() + this.getImage().height > other.getYPos()) {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=Player.js.map