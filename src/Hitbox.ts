export default class Hitbox {
  // x position of the hitbox
  private x: number;

  // y position of the hitbox
  private y: number;

  // width of the hitbox
  private width: number;

  // height if the hitbox
  private height: number;

  // opacity/density of the htibox
  private opacity: number;

  /**
   *
   * @param x position
   * @param y position
   * @param w number representing the width
   * @param h number representing the height
   * @param opacity number for the opacity
   */
  constructor(x: number, y: number, w: number, h: number, opacity?: number) {
    // sets every attribute
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.opacity = opacity;
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
    ctx2.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx2.fillRect(this.x, this.y, this.width, this.height);
    ctx2.stroke();
  }
}
