import Dialog from './Dialog.js';
import GameEntity from './GameEntity.js';

export default class Npc extends GameEntity {
  // Dialogs which show up on the screen
  private dialogs: Dialog[];

  // the image spinning above their head
  private questSign: HTMLImageElement;

  // image height of every star
  private starHeight: number = 97;

  // image width of every star
  private starWdth: number = 100;

  // frame for every star
  private frameX: number = 0;

  // used to determine of NPC has star
  private hasQuest: boolean;

  /**
   * Creates new NPC
   *
   * @param imageSrc image of npc
   * @param xPos X position
   * @param yPos Y position
   * @param dialogs dialogs of this Npc - STRING ARRAY
   */
  constructor(
    imageSrc: string,
    xPos: number,
    yPos: number,
    dialogs: Dialog[],
    hasQuest?: boolean
  ) {
    super(imageSrc, xPos, yPos);
    this.dialogs = dialogs;

    this.questSign = new Image();
    this.questSign.src = './assets/img/spinIconRount.png';

    this.hasQuest = hasQuest;
  }

  /**
   *  getter for dialogs
   *
   * @returns dialogs
   */
  public getDialogs(): Dialog[] {
    return this.dialogs;
  }

  /**
   * this method draws the entity to the canvas
   *
   * @param ctx canvas rendering context 2d
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());

    if (this.hasQuest === true) {
      this.drawStar(ctx, this.getXPos() + 5, this.getYPos() - 40);
    }
  }

  /**
   *
   * @param ctx Cavans Context
   * @param x  x of star
   * @param y  y of star
   */
  public drawStar(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(
      this.questSign,
      this.frameX * this.starWdth,
      0,
      this.starWdth,
      this.starHeight,
      x,
      y,
      this.starWdth - 65,
      this.starHeight - 65
    );
  }

  /**
   * Sets the X frame
   *
   * @param newFrame number of frame
   */
  public setFrameX(newFrame: number): void {
    this.frameX = newFrame;
  }
}
