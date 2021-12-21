export default abstract class GameEntity {
  private img: HTMLImageElement;

  private xPos: number;

  private yPos: number;

  private imageWidth: number;

  private imageHeight: number;

  /**
   * creates a new game entity
   *
   * @param imageSrc a string for the source of the image
   * @param xPos a number for x pos
   * @param yPos a number for y pos
   */
  constructor(imageSrc: string, xPos: number, yPos: number) {
    this.img = GameEntity.loadNewImage(imageSrc);
    this.xPos = xPos;
    this.yPos = yPos;
  }

  /**
   * this method returns the image
   *
   * @returns image image element
   */
  public getImage(): HTMLImageElement {
    return this.img;
  }

  /**
   * this method returns the image
   *
   * @param source a string for the image
   */
  public setImage(source: string): void {
    this.img = GameEntity.loadNewImage(source);
  }

  /**
   * this method returns the image
   *
   * @param width a number for the image width
   */
  public setImageWidth(width: number): void {
    this.imageWidth = width;
  }

  /**
   * this method returns the image
   *
   * @param height a number for the image height
   */
  public setImageHeight(height: number): void {
    this.imageHeight = height;
  }

  /**
   * getter for x position
   *
   * @returns x position
   */
  public getXPos(): number {
    return this.xPos;
  }

  /**
   * getter for y position
   *
   * @returns y position
   */
  public getYPos(): number {
    return this.yPos;
  }

  /**
   * setter for the x position
   *
   * @param number by how much the x position should change
   */
  public setXPos(number: number): void {
    this.xPos += number;
  }

  /**
   * setter for the y position
   *
   * @param number by how much the y position should change
   */
  public setYPos(number: number): void {
    this.yPos += number;
  }

  /**
   * this method draws the entity to the canvas
   *
   * @param ctx canvas rendering context 2d
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.img, this.xPos, this.yPos, this.imageWidth, this.imageHeight);
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
