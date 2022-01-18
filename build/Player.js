import KeyListener from './KeyListener.js';
import GameEntity from './GameEntity.js';
import UserData from './UserData.js';
export default class Player extends GameEntity {
    xVelocity;
    yVelocity;
    keyboard;
    walk;
    userData;
    constructor(canvas) {
        super('./assets/img/player-boy-up.png', canvas.width / 2, canvas.height / 2);
        this.userData = new UserData();
        this.xVelocity = 3;
        this.yVelocity = 3;
        this.keyboard = new KeyListener();
        this.walk = new Audio('./assets/sound/walk.ogg');
        console.log('creating player');
    }
    movePlayer(canvas, collision) {
        if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT) &&
            this.getXPos() + this.getImage().width < canvas.width &&
            (collision === 'none' ||
                collision === 'left' ||
                collision === 'bottom' ||
                collision === 'top')) {
            this.setXPos(this.getXPos() + this.xVelocity);
            this.setImage('./assets/img/player-boy1-right.png');
            this.walk.play();
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT) && this.getXPos() > 0 &&
            (collision === 'none' ||
                collision === 'right' ||
                collision === 'bottom' ||
                collision === 'top')) {
            this.setXPos(this.getXPos() - this.xVelocity);
            this.setImage('./assets/img/player-boy1-left.png');
            this.walk.play();
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_UP) && this.getYPos() > 0 &&
            (collision === 'none' ||
                collision === 'left' ||
                collision === 'bottom' ||
                collision === 'right')) {
            this.setYPos(this.getYPos() - this.yVelocity);
            this.setImage('./assets/img/player-boy1-up.png');
            this.walk.play();
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_DOWN) &&
            this.getYPos() + this.getImage().height < canvas.height &&
            (collision === 'none' ||
                collision === 'left' ||
                collision === 'right' ||
                collision === 'top')) {
            this.setYPos(this.getYPos() + this.yVelocity);
            this.setImage('./assets/img/player-boy1-down.png');
            this.walk.play();
        }
    }
    isInteractingMenu() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_M)) {
            return true;
        }
        return false;
    }
    isReadingHint() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_H)) {
            return true;
        }
        return false;
    }
    isInteracting() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
            return true;
        }
        return false;
    }
    collidesWith(other) {
        if (this.getXPos() < other.getXPos() + other.getImage().width &&
            this.getXPos() + this.getImage().width > other.getXPos() &&
            this.getYPos() < other.getYPos() + other.getImage().height &&
            this.getYPos() + this.getImage().height > other.getYPos()) {
            return true;
        }
        return false;
    }
    collidesWithHitbox(box) {
        if (this.getXPos() < box.getXPos() + box.getWidth() &&
            this.getXPos() + this.getImage().width > box.getXPos() &&
            this.getYPos() < box.getYPos() + box.getHeight() &&
            this.getYPos() + this.getImage().height > box.getYPos()) {
            console.log('collision');
            return true;
        }
        return false;
    }
    getUserData() {
        return this.userData;
    }
    rectCollision(box, player) {
        const dx = (box.getXPos() + box.getWidth() / 2) - (player.getXPos() + player.getImage().width / 2);
        const dy = (box.getYPos() + box.getHeight() / 2) - (player.getYPos() + player.getImage().height / 2);
        const width = (box.getWidth() + player.getImage().width) / 2;
        const height = (box.getHeight() + player.getImage().height) / 2;
        const crossWidth = width * dy;
        const crossHeight = height * dx;
        let collision = 'none';
        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) {
                collision = (crossWidth > (-crossHeight)) ? 'bottom' : 'left';
            }
            else {
                collision = (crossWidth > -(crossHeight)) ? 'right' : 'top';
            }
        }
        return (collision);
    }
}
//# sourceMappingURL=Player.js.map