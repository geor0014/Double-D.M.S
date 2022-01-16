export default class Boss {
  private bossImg: HTMLImageElement;

  private spriteWidth: number;

  private spriteHeight: number;

  private frameY: number = 0;

  /**
   * Creates a new Boss
   */
  constructor() {
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
  setFrameY(newFrame: number): void {
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
      430,
      341,
      this.spriteWidth + 30,
      this.spriteHeight + 30
    );
  }
}
