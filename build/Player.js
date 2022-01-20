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
    collision = 'none';
    walkPath;
    hintSound = new Audio('./assets/sound/hint.wav');
    constructor(canvas, characterNum) {
        super('', canvas.width / 2, canvas.height / 2);
        this.userData = new UserData();
        this.characterNum = characterNum;
        if (this.characterNum === 1) {
            this.setImage('./assets/img/playerBoy1Up.png');
        }
        else if (this.characterNum === 2) {
            this.setImage('./assets/img/playerBoy2Up.png');
        }
        else if (this.characterNum === 3) {
            this.setImage('./assets/img/playerGirl2Up.png');
        }
        else if (this.characterNum === 4) {
            this.setImage('./assets/img/playerGirl1Up.png');
        }
        this.xVelocity = 3;
        this.yVelocity = 3;
        this.keyboard = new KeyListener();
        this.walkPath = './assets/sound/walk.ogg';
        this.walk = new Audio(this.walkPath);
    }
    movePlayer(canvas) {
        if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)
            && this.getXPos() + this.getImage().width < canvas.width
            && (this.collision === 'none'
                || this.collision === 'left'
                || this.collision === 'bottom'
                || this.collision === 'top')) {
            this.setXPos(this.getXPos() + this.xVelocity);
            this.walk.play();
            if (this.characterNum === 1) {
                this.setImage('./assets/img/PlayerBoy1RIght.png');
            }
            else if (this.characterNum === 2) {
                this.setImage('./assets/img/playerBoy2Right.png');
            }
            else if (this.characterNum === 3) {
                this.setImage('./assets/img/playerGirl2Right.png');
            }
            else if (this.characterNum === 4) {
                this.setImage('./assets/img/playerGirl1Right.png');
            }
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT)
            && this.getXPos() > 0
            && (this.collision === 'none'
                || this.collision === 'right'
                || this.collision === 'bottom'
                || this.collision === 'top')) {
            this.setXPos(this.getXPos() - this.xVelocity);
            this.walk.play();
            if (this.characterNum === 1) {
                this.setImage('./assets/img/PlayerBoy1Left.png');
            }
            else if (this.characterNum === 2) {
                this.setImage('./assets/img/playerBoy2Left.png');
            }
            else if (this.characterNum === 3) {
                this.setImage('./assets/img/playerGirl2Left.png');
            }
            else if (this.characterNum === 4) {
                this.setImage('./assets/img/playerGirl1Left.png');
            }
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_UP)
            && this.getYPos() > 0
            && (this.collision === 'none'
                || this.collision === 'left'
                || this.collision === 'bottom'
                || this.collision === 'right')) {
            this.setYPos(this.getYPos() - this.yVelocity);
            this.walk.play();
            if (this.characterNum === 1) {
                this.setImage('./assets/img/playerBoy1Up.png');
            }
            else if (this.characterNum === 2) {
                this.setImage('./assets/img/playerBoy2Up.png');
            }
            else if (this.characterNum === 3) {
                this.setImage('./assets/img/playerGirl2Up.png');
            }
            else if (this.characterNum === 4) {
                this.setImage('./assets/img/playerGirl1Up.png');
            }
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_DOWN)
            && this.getYPos() + this.getImage().height < canvas.height
            && (this.collision === 'none'
                || this.collision === 'left'
                || this.collision === 'right'
                || this.collision === 'top')) {
            this.setYPos(this.getYPos() + this.yVelocity);
            this.walk.play();
            if (this.characterNum === 1) {
                this.setImage('./assets/img/PlayerBoy1Down.png');
            }
            else if (this.characterNum === 2) {
                this.setImage('./assets/img/playerBoy2Down.png');
            }
            else if (this.characterNum === 3) {
                this.setImage('./assets/img/playerGirl2Down.png');
            }
            else if (this.characterNum === 4) {
                this.setImage('./assets/img/playerGirl1Down.png');
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
            this.hintSound.play();
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
        if (this.getXPos() < other.getXPos() + other.getImage().width
            && this.getXPos() + this.getImage().width > other.getXPos()
            && this.getYPos() < other.getYPos() + other.getImage().height
            && this.getYPos() + this.getImage().height > other.getYPos()) {
            return true;
        }
        return false;
    }
    collidesWithHitbox(box) {
        if (this.getXPos() < box.getXPos() + box.getWidth()
            && this.getXPos() + this.getImage().width > box.getXPos()
            && this.getYPos() < box.getYPos() + box.getHeight()
            && this.getYPos() + this.getImage().height > box.getYPos()) {
            return true;
        }
        return false;
    }
    rectCollision(box, player) {
        const dx = box.getXPos() + box.getWidth() / 2 - (player.getXPos() + player.getImage().width / 2);
        const dy = box.getYPos() + box.getHeight() / 2 - (player.getYPos() + player.getImage().height / 2);
        const width = (box.getWidth() + player.getImage().width) / 2;
        const height = (box.getHeight() + player.getImage().height) / 2;
        const crossWidth = width * dy;
        const crossHeight = height * dx;
        let collision = 'none';
        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) {
                collision = crossWidth > -crossHeight ? 'bottom' : 'left';
            }
            else {
                collision = crossWidth > -crossHeight ? 'right' : 'top';
            }
        }
        return collision;
    }
    setCollision(string) {
        this.collision = string;
    }
    getCollision() {
        return this.collision;
    }
    setWalkPath(path) {
        this.walkPath = path;
    }
    getWalkPath() {
        return this.walkPath;
    }
    getUserData() {
        return this.userData;
    }
    getCharacterNum() {
        return this.characterNum;
    }
}
//# sourceMappingURL=Player.js.map