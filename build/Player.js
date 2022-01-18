import KeyListener from './KeyListener.js';
import GameEntity from './GameEntity.js';
import UserData from './UserData.js';
export default class Player extends GameEntity {
    xVelocity;
    yVelocity;
    keyboard;
    walk;
    userData;
    characterNum;
    constructor(canvas, characterNum) {
        super('', canvas.width / 2, canvas.height / 2);
        this.userData = new UserData();
        this.characterNum = characterNum;
        if (this.characterNum === 1) {
            this.setImage('./assets/img/player-boy1-up.png');
        }
        else if (this.characterNum === 2) {
            this.setImage('./assets/img/player-boy2-up.png');
        }
        else if (this.characterNum === 3) {
            this.setImage('./assets/img/player-girl2-up.png');
        }
        else if (this.characterNum === 4) {
            this.setImage('./assets/img/player-girl1-up.png');
        }
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
            this.walk.play();
            if (this.characterNum === 1) {
                this.setImage('./assets/img/player-boy1-right.png');
            }
            else if (this.characterNum === 2) {
                this.setImage('./assets/img/player-boy2-right.png');
            }
            else if (this.characterNum === 3) {
                this.setImage('./assets/img/player-girl2-right.png');
            }
            else if (this.characterNum === 4) {
                this.setImage('./assets/img/player-girl1-right.png');
            }
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT) && this.getXPos() > 0 &&
            (collision === 'none' ||
                collision === 'right' ||
                collision === 'bottom' ||
                collision === 'top')) {
            this.setXPos(this.getXPos() - this.xVelocity);
            this.walk.play();
            if (this.characterNum === 1) {
                this.setImage('./assets/img/player-boy1-left.png');
            }
            else if (this.characterNum === 2) {
                this.setImage('./assets/img/player-boy2-left.png');
            }
            else if (this.characterNum === 3) {
                this.setImage('./assets/img/player-girl2-left.png');
            }
            else if (this.characterNum === 4) {
                this.setImage('./assets/img/player-girl1-left.png');
            }
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_UP) && this.getYPos() > 0 &&
            (collision === 'none' ||
                collision === 'left' ||
                collision === 'bottom' ||
                collision === 'right')) {
            this.setYPos(this.getYPos() - this.yVelocity);
            this.walk.play();
            if (this.characterNum === 1) {
                this.setImage('./assets/img/player-boy1-up.png');
            }
            else if (this.characterNum === 2) {
                this.setImage('./assets/img/player-boy2-up.png');
            }
            else if (this.characterNum === 3) {
                this.setImage('./assets/img/player-girl2-up.png');
            }
            else if (this.characterNum === 4) {
                this.setImage('./assets/img/player-girl1-up.png');
            }
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_DOWN) &&
            this.getYPos() + this.getImage().height < canvas.height &&
            (collision === 'none' ||
                collision === 'left' ||
                collision === 'right' ||
                collision === 'top')) {
            this.setYPos(this.getYPos() + this.yVelocity);
            this.walk.play();
            if (this.characterNum === 1) {
                this.setImage('./assets/img/player-boy1-down.png');
            }
            else if (this.characterNum === 2) {
                this.setImage('./assets/img/player-boy2-down.png');
            }
            else if (this.characterNum === 3) {
                this.setImage('./assets/img/player-girl2-down.png');
            }
            else if (this.characterNum === 4) {
                this.setImage('./assets/img/player-girl1-down.png');
            }
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
<<<<<<< HEAD
    getCharacterNum() {
        return this.characterNum;
=======
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
>>>>>>> 8a8630a1189db8f7ca7a224c22a6cae82d13d694
    }
}
//# sourceMappingURL=Player.js.map