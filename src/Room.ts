import Scene from './Scene.js';
import Player from './Player.js';
import Candy from './Candy.js';

export default abstract class Room extends Scene {
  // player
  // private player: Player;

  // X position of the image of the room
  protected xPos: number;

  // Y position of the image of the room
  protected yPos: number;

  // Image of the room
  protected img: HTMLImageElement;

  protected imageWidth: number;

  protected imageHeight: number;

  protected player: Player;

  protected candies: Candy[] = [];

  /**
   * Create a new room
   *
   * @param canvas canvas element
   * @param imgSrc source for image
   * @param player a player
   */
  constructor(canvas: HTMLCanvasElement, imgSrc: string, player: Player) {
    super(canvas);

    this.player = player;
    this.img = new Image();
    this.img.src = imgSrc;

    this.candies.push(new Candy(this.canvas.width / 2, this.canvas.height / 2));

    console.log(this.img.width);
  }

  /**
   * Methos to detect the input of the player
   */
  public processInput(): void {
    this.player.movePlayer(this.canvas);
  }

  /**
   * Game cycle, basically loop that keeps the game running. It contains all
   * the logic needed to draw the individual frames.
   *
   * @param elapsed a number
   * @returns a scene or null
   */
  public update(elapsed: number): Scene {
    // Clear the screen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if ((this.player.getXPos() >= this.xPos && this.player.getXPos() <= this.xPos + this.imageWidth)
      && (this.player.getYPos() >= this.yPos && this.player.getYPos() <= this.yPos + this.imageHeight)) {
      // Move the player
      this.processInput();
    }

    return null;
  }

  /**
   * Draw the room
   *
   * @param ctx of the canvas
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.img, this.xPos, this.yPos, this.imageWidth, this.imageHeight);
  }

  /**
   * Draw all the necessary items to the screen
   */
  public render(): void {
    this.draw(this.ctx);
    this.candies[0].draw(this.ctx);
    this.player.draw(this.ctx);
  }
}
