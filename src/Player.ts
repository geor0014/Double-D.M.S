import KeyListener from './KeyListener.js';
import GameItem from './GameEntity.js';

export default class Player extends GameItem {
  private xVelocity: number;

  private yVelocity: number;

  private keyboard: KeyListener;

  constructor(maxX: number, maxY: number) {
    super('./assets/img/character_robot_walk0.png', maxX, maxY);
    this.xVelocity = 3;
    this.yVelocity = 3;
    this.keyboard = new KeyListener();
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
      && this.xPos + this.img.width < canvas.width
    ) {
      this.xPos += this.xVelocity;
    }

    // Moving left
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_LEFT)
      && this.xPos > 0
    ) {
      this.xPos -= this.xVelocity;
    }

    // Moving up
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_UP)
      && this.yPos > 0
    ) {
      this.yPos -= this.yVelocity;
    }

    // Moving down
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_DOWN)
      && this.yPos + this.img.height < canvas.height
    ) {
      this.yPos += this.yVelocity;
    }
  }

  public isCleaning(): boolean {
    if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
      return true;
    }
    return false;
  }

  public collidesWith(other: GameItem): boolean {
    if (
      this.xPos < other.getXPos() + other.getImageWidth()
      && this.xPos + this.img.width > other.getXPos()
      && this.yPos < other.getYPos() + other.getImageHeight()
      && this.yPos + this.img.height > other.getYPos()
    ) {
      return true;
    }
    return false;
  }
}
