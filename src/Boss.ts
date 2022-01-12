export default class Boss {
  private bossImg: HTMLImageElement;

  private spriteWidth: number;

  private spriteHeight: number;

  private frameY: number = 0;

  constructor() {
    this.bossImg = new Image();
    this.bossImg.src = './assets/img/boss.png';

    this.spriteHeight = 83.7;
    this.spriteWidth = 133;
  }

  setFrameY(newFrame: number): void {
    this.frameY = newFrame;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    // draw boss
    // this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(
      this.bossImg,
      0,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      503,
      414,
      this.spriteWidth,
      this.spriteHeight
    );
  }
}
