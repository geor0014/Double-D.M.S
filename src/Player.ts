import KeyListener from './KeyListener.js';
import GameEntity from './GameEntity.js';

export default class Player extends GameEntity {
  private xVelocity: number;

  private yVelocity: number;

  private keyboard: KeyListener;

  /**
   * Create new player
   *
   * @param canvas a canvas element
   */
  constructor(canvas: HTMLCanvasElement) {
    super(
      './assets/img/player-boy-standing.png',
      canvas.width / 2,
      canvas.height / 2,
    );

    // this.setYPos(this.getYPos() - this.getImage().height);
    this.xVelocity = 3;
    this.yVelocity = 3;
    this.keyboard = new KeyListener();

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
      this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)
      && this.getXPos() + this.getImage().width < canvas.width
    ) {
      this.setXPos(this.getXPos() + this.xVelocity);
      this.setImage('./assets/img/player-boy-right.png');
    }

    // Moving left
    if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT) && this.getXPos() > 0) {
      this.setXPos(this.getXPos() - this.xVelocity);
      this.setImage('./assets/img/player-boy-left.png');
    }

    // Moving up
    if (this.keyboard.isKeyDown(KeyListener.KEY_UP) && this.getYPos() > 0) {
      this.setYPos(this.getYPos() - this.yVelocity);
      this.setImage('./assets/img/player-boy-up.png');
    }

    // Moving down
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_DOWN)
      && this.getYPos() + this.getImage().height < canvas.height
    ) {
      this.setYPos(this.getYPos() + this.yVelocity);
      this.setImage('./assets/img/player-boy-standing.png');
    }
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
}
