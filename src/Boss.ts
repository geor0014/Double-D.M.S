export default class Boss {
  // image of the boss
  private bossImg: HTMLImageElement;

  // the width of the boss image
  private spriteWidth: number;

  // the height of the boss image
  private spriteHeight: number;

  // frame so the image knows what to show
  private frameY: number = 0;

  /**
   * Creates a new Boss
   */
  public constructor() {
    this.bossImg = new Image();
    this.bossImg.src = './assets/img/boss.png';

    this.spriteHeight = 83.7;
    this.spriteWidth = 133;
  }

  /**
   * Sets the Y frame
   *
   * @param newFrame number of frame
   */
  public setFrameY(newFrame: number): void {
    this.frameY = newFrame;
  }

  /**
   * Drawing method for the Image of the boss
   *
   * @param ctx canvas rendring context 2D
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    // draw boss
    // this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(
      this.bossImg,
      0,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      470,
      230,
      this.spriteWidth + 30,
      this.spriteHeight + 30,
    );
  }
}
