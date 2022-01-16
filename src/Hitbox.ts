export default class Hitbox {
  private x: number;

  private y: number;

  private width: number;

  private height: number;

  /**
   *
   * @param x number
   * @param y number
   * @param w number
   * @param h number
   */
  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  /**
   * getter for x position
   *
   * @returns x position
   */
  public getXPos(): number {
    return this.x;
  }

  /**
   * getter for y position
   *
   * @returns y position
   */
  public getYPos(): number {
    return this.y;
  }

  /**
   * getter for x position
   *
   * @returns x position
   */
  public getWidth(): number {
    return this.width;
  }

  /**
   * getter for y position
   *
   * @returns y position
   */
  public getHeight(): number {
    return this.height;
  }

  /**
   * Draws the hit box
   *
   * @param canvas Canvas
   */
  public draw(canvas: HTMLCanvasElement): void {
    const ctx2 = canvas.getContext('2d');
    ctx2.beginPath();
    ctx2.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx2.fillRect(this.x, this.y, this.width, this.height);
    ctx2.stroke();
  }
}
