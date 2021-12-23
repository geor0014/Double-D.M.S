import KeyListener from './KeyListener.js';
import GameEntity from './GameEntity.js';
export default class Player extends GameEntity {
    xVelocity;
    yVelocity;
    keyboard;
    walk;
    constructor(canvas) {
        super('./assets/img/player-boy-up.png', canvas.width / 2, canvas.height / 2);
        this.xVelocity = 3;
        this.yVelocity = 3;
        this.keyboard = new KeyListener();
        this.walk = new Audio('./assets/sound/walk.ogg');
        console.log('creating player');
    }
    movePlayer(canvas) {
        if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)
            && this.getXPos() + this.getImage().width < canvas.width) {
            this.setXPos(this.getXPos() + this.xVelocity);
            this.setImage('./assets/img/player-boy-right.png');
            this.walk.play();
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT) && this.getXPos() > 0) {
            this.setXPos(this.getXPos() - this.xVelocity);
            this.setImage('./assets/img/player-boy-left.png');
            this.walk.play();
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_UP) && this.getYPos() > 0) {
            this.setYPos(this.getYPos() - this.yVelocity);
            this.setImage('./assets/img/player-boy-up.png');
            this.walk.play();
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_DOWN)
            && this.getYPos() + this.getImage().height < canvas.height) {
            this.setYPos(this.getYPos() + this.yVelocity);
            this.setImage('./assets/img/player-boy-standing.png');
            this.walk.play();
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