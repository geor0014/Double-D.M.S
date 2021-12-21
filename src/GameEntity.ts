export default abstract class GameItem {

  protected img: HTMLImageElement;

  protected xPos: number;

  protected yPos: number;

  constructor(imageSrc: string, maxX: number, maxY: number) {
    this.img = GameItem.loadNewImage(imageSrc);
    this.xPos = GameItem.randomNumber(0, maxX);
    this.yPos = GameItem.randomNumber(0, maxY);
  }

  public getImageHeight(): number {
    return this.img.height;
  }

  public getImageWidth(): number {
    return this.img.width;
  }

  public getXPos(): number {
    return this.xPos;
  }

  public getYPos(): number {
    return this.yPos;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.img, this.xPos, this.yPos);
  }

  /**
  * Method to load an image
  *
  * @param source the source
  * @returns HTMLImageElement - returns an image
  */
  private static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  /**
 * Returns a random number between min and max
 *
 * @param min - lower boundary
 * @param max - upper boundary
 * @returns a random number between min and max
 */
  protected static randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}
