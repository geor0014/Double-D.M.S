import KeyListener from './KeyListener.js';
import GameEntity from './GameEntity.js';
import UserData from './UserData.js';
import Hitbox from './Hitbox.js';

export default class Player extends GameEntity {
  private xVelocity: number;

  private yVelocity: number;

  private keyboard: KeyListener;

  private walk: HTMLAudioElement;

  private userData: UserData;

  /**
   * Create new player
   *
   * @param canvas a canvas element
   */
  constructor(canvas: HTMLCanvasElement) {
    super(
      './assets/img/player-boy-up.png',
      canvas.width / 2,
      canvas.height / 2,
    );

    // creates a new UserData
    this.userData = new UserData();

    // this.setYPos(this.getYPos() - this.getImage().height);
    // sets the speed of the player
    this.xVelocity = 3;
    this.yVelocity = 3;
    // creates key listener
    this.keyboard = new KeyListener();

    // audio of player walking
    this.walk = new Audio('./assets/sound/walk.ogg');

    console.log('creating player');
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
      this.keyboard.isKeyDown(KeyListener.KEY_RIGHT) &&
      this.getXPos() + this.getImage().width < canvas.width
    ) {
      this.setXPos(this.getXPos() + this.xVelocity);
      this.setImage('./assets/img/player-boy1-right.png');
      this.walk.play();
    }

    // Moving left
    if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT) && this.getXPos() > 0) {
      this.setXPos(this.getXPos() - this.xVelocity);
      this.setImage('./assets/img/player-boy1-left.png');
      this.walk.play();
    }

    // Moving up
    if (this.keyboard.isKeyDown(KeyListener.KEY_UP) && this.getYPos() > 0) {
      this.setYPos(this.getYPos() - this.yVelocity);
      this.setImage('./assets/img/player-boy1-up.png');
      this.walk.play();
    }

    // Moving down
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_DOWN) &&
      this.getYPos() + this.getImage().height < canvas.height
    ) {
      this.setYPos(this.getYPos() + this.yVelocity);
      this.setImage('./assets/img/player-boy1-down.png');
      this.walk.play();
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
      this.getXPos() < other.getXPos() + other.getImage().width &&
      this.getXPos() + this.getImage().width > other.getXPos() &&
      this.getYPos() < other.getYPos() + other.getImage().height &&
      this.getYPos() + this.getImage().height > other.getYPos()
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
      this.getXPos() < box.getXPos() + box.getWidth() &&
      this.getXPos() + this.getImage().width > box.getXPos() &&
      this.getYPos() < box.getYPos() + box.getHeight() &&
      this.getYPos() + this.getImage().height > box.getYPos()
    ) {
      console.log('collision');
      return true;
    }
    return false;
  }

  /**
   * getter for user data
   *
   * @returns user data
   */
  public getUserData(): UserData {
    return this.userData;
  }
}
