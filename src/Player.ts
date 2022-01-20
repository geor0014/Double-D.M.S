import KeyListener from './KeyListener.js';
import GameEntity from './GameEntity.js';
import UserData from './UserData.js';
import Hitbox from './Hitbox.js';

export default class Player extends GameEntity {
  // x velocity of the player, meaning how much to move relative to the last position
  private xVelocity: number;

  // y velocity of the player, meaning how much to move relative to the last position
  private yVelocity: number;

  // Keyboardlistener to check if a key got pressed or not
  private keyboard: KeyListener;

  // walk sound of the player
  private walk: HTMLAudioElement;

  // userdata for the player
  private userData: UserData;

  // number of the character the player chose
  private characterNum: number;

  // which side the player has collided with
  private collision: string = 'none';

  // src of the walk attribute
  private walkPath: string;

  // hint sound when opened
  private hintSound: HTMLAudioElement = new Audio('./assets/sound/hint.wav');

  /**
   * Create new player
   *
   * @param canvas a canvas element
   * @param characterNum number presenting the player choice of a character
   */
  public constructor(canvas: HTMLCanvasElement, characterNum: number) {
    super('', canvas.width / 2, canvas.height / 2);

    // creates a new UserData
    this.userData = new UserData();
    this.characterNum = characterNum;

    // sets the player image according to the number of cnumb
    if (this.characterNum === 1) {
      this.setImage('./assets/img/player-boy1-up.png');
    } else if (this.characterNum === 2) {
      this.setImage('./assets/img/player-boy2-up.png');
    } else if (this.characterNum === 3) {
      this.setImage('./assets/img/player-girl2-up.png');
    } else if (this.characterNum === 4) {
      this.setImage('./assets/img/player-girl1-up.png');
    }

    // sets the speed of the player
    this.xVelocity = 3;
    this.yVelocity = 3;

    // creates key listener
    this.keyboard = new KeyListener();

    // sets src of the sound
    this.walkPath = './assets/sound/walk.ogg';

    // audio of player walking
    this.walk = new Audio(this.walkPath);
  }

  /**
   * Moves the player depending on which arrow key is pressed. Player is bound
   * to the canvas and cannot move outside of it
   *
   * @param canvas item
   */
  public movePlayer(canvas: HTMLCanvasElement): void {
    // Moving right
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)
      && this.getXPos() + this.getImage().width < canvas.width
      && (this.collision === 'none'
      || this.collision === 'left'
      || this.collision === 'bottom'
      || this.collision === 'top')
    ) {
      this.setXPos(this.getXPos() + this.xVelocity);
      this.walk.play();

      // sets the image of the player accoring to cnumb
      if (this.characterNum === 1) {
        this.setImage('./assets/img/player-boy1-right.png');
      } else if (this.characterNum === 2) {
        this.setImage('./assets/img/player-boy2-right.png');
      } else if (this.characterNum === 3) {
        this.setImage('./assets/img/player-girl2-right.png');
      } else if (this.characterNum === 4) {
        this.setImage('./assets/img/player-girl1-right.png');
      }
    }

    // Moving left
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_LEFT)
      && this.getXPos() > 0
      && (this.collision === 'none'
      || this.collision === 'right'
      || this.collision === 'bottom'
      || this.collision === 'top')
    ) {
      this.setXPos(this.getXPos() - this.xVelocity);
      this.walk.play();

      // sets the image of the player accoring to cnumb
      if (this.characterNum === 1) {
        this.setImage('./assets/img/player-boy1-left.png');
      } else if (this.characterNum === 2) {
        this.setImage('./assets/img/player-boy2-left.png');
      } else if (this.characterNum === 3) {
        this.setImage('./assets/img/player-girl2-left.png');
      } else if (this.characterNum === 4) {
        this.setImage('./assets/img/player-girl1-left.png');
      }
    }

    // Moving up
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_UP)
      && this.getYPos() > 0
      && (this.collision === 'none'
      || this.collision === 'left'
      || this.collision === 'bottom'
      || this.collision === 'right')
    ) {
      this.setYPos(this.getYPos() - this.yVelocity);
      this.walk.play();

      // sets the image of the player accoring to cnumb
      if (this.characterNum === 1) {
        this.setImage('./assets/img/player-boy1-up.png');
      } else if (this.characterNum === 2) {
        this.setImage('./assets/img/player-boy2-up.png');
      } else if (this.characterNum === 3) {
        this.setImage('./assets/img/player-girl2-up.png');
      } else if (this.characterNum === 4) {
        this.setImage('./assets/img/player-girl1-up.png');
      }
    }

    // Moving down
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_DOWN)
      && this.getYPos() + this.getImage().height < canvas.height
      && (this.collision === 'none'
      || this.collision === 'left'
      || this.collision === 'right'
      || this.collision === 'top')
    ) {
      this.setYPos(this.getYPos() + this.yVelocity);
      this.walk.play();

      // sets the image of the player accoring to cnumb
      if (this.characterNum === 1) {
        this.setImage('./assets/img/player-boy1-down.png');
      } else if (this.characterNum === 2) {
        this.setImage('./assets/img/player-boy2-down.png');
      } else if (this.characterNum === 3) {
        this.setImage('./assets/img/player-girl2-down.png');
      } else if (this.characterNum === 4) {
        this.setImage('./assets/img/player-girl1-down.png');
      }
    }
  }

  /**
   * this method checks if the player is trying to interact
   *
   * @returns true or false
   */
  public isInteractingMenu(): boolean {
    if (this.keyboard.isKeyDown(KeyListener.KEY_M)) {
      return true;
    }
    return false;
  }

  /**
   * checks if player is reading a hint
   *
   * @returns boolean
   */
  public isReadingHint(): boolean {
    if (this.keyboard.isKeyDown(KeyListener.KEY_H)) {
      this.hintSound.play();
      return true;
    }
    return false;
  }

  /**
   * this method checks if the player is trying to interact
   *
   * @returns true or false
   */
  public isInteracting(): boolean {
    if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
      return true;
    }
    return false;
  }

  /**
   * this method checks if the player is colliding with an item
   *
   * @param other game item
   * @returns true of false
   */
  public collidesWith(other: GameEntity): boolean {
    if (
      this.getXPos() < other.getXPos() + other.getImage().width
      && this.getXPos() + this.getImage().width > other.getXPos()
      && this.getYPos() < other.getYPos() + other.getImage().height
      && this.getYPos() + this.getImage().height > other.getYPos()
    ) {
      return true;
    }
    return false;
  }

  /**
   * checks if player is colliding with hitBox
   *
   * @param box hit box
   * @returns true or false
   */
  public collidesWithHitbox(box: Hitbox): boolean {
    if (
      this.getXPos() < box.getXPos() + box.getWidth()
      && this.getXPos() + this.getImage().width > box.getXPos()
      && this.getYPos() < box.getYPos() + box.getHeight()
      && this.getYPos() + this.getImage().height > box.getYPos()
    ) {
      // console.log('collision');

      return true;
    }
    return false;
  }

  /**
   * Setter for the velocity
   *
   * @param number new velocity
   */
  public setXVelocity(number: number): void {
    this.xVelocity = number;
  }

  /**
   * Setter for the velocity
   *
   * @param number new velocity
   */
  public setYVelocity(number: number): void {
    this.yVelocity = number;
  }

  /**
   * getter for user data
   *
   * @returns user data
   */
  public getUserData(): UserData {
    return this.userData;
  }

  /**
   * Getter for character number
   *
   * @returns number
   */
  public getCharacterNum(): number {
    return this.characterNum;
  }

  /**
   * Tells the side of the collision of the player with the hitbox
   *
   * @param box hitbox
   * @param player of the game
   * @returns a location of the player relative to the box
   */
  // eslint-disable-next-line class-methods-use-this
  public rectCollision(box: Hitbox, player: Player): string {
    // eslint-disable-next-line max-len
    const dx = box.getXPos() + box.getWidth() / 2 - (player.getXPos() + player.getImage().width / 2);
    // eslint-disable-next-line max-len
    const dy = box.getYPos() + box.getHeight() / 2 - (player.getYPos() + player.getImage().height / 2);
    const width = (box.getWidth() + player.getImage().width) / 2;
    const height = (box.getHeight() + player.getImage().height) / 2;
    const crossWidth = width * dy;
    const crossHeight = height * dx;
    let collision = 'none';

    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
      if (crossWidth > crossHeight) {
        collision = crossWidth > -crossHeight ? 'bottom' : 'left';
      } else {
        collision = crossWidth > -crossHeight ? 'right' : 'top';
      }
    }
    return collision;
  }

  /**
   * Setter for the collision
   *
   * @param string side of the collision
   */
  public setCollision(string: string): void {
    this.collision = string;
  }

  /**
   * Getter for the collision
   *
   * @returns the collision side string
   */
  public getCollision(): string {
    return this.collision;
  }

  /**
   * Setter for the walkpath
   *
   * @param path new sound file for the player
   */
  public setWalkPath(path: string): void {
    this.walkPath = path;
  }

  /**
   * Getter for the walkpath
   *
   * @returns the current walkpath
   */
  public getWalkPath(): string {
    return this.walkPath;
  }
}
