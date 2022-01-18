import Scene from './Scene.js';

export default abstract class Screen extends Scene {
  private img: HTMLImageElement;

  private xPos: number;

  private yPos: number;

  /**
   * Creates a new screen
   *
   * @param canvas of the game
   * @param imgSrc of the Screen
   */
  public constructor(canvas: HTMLCanvasElement, imgSrc: string) {
    super(canvas);

    this.img = new Image();
    this.img.src = imgSrc;
  }

  public abstract processInput(): boolean;

  public abstract update(elapsed: number): Scene;

  public abstract render(): void;

  public abstract draw(ctx: CanvasRenderingContext2D): void;

  /**
   * Getter for the x position of the screen
   *
   * @returns the x position of the screen
   */
  public getXPos(): number {
    return this.xPos;
  }

  /**
   * Getter for the y position of the screen
   *
   * @returns the y position of the screen
   */
  public getYPos(): number {
    return this.yPos;
  }

  /**
   * Setter for the x poosition
   *
   * @param xPos new x position of the screen
   */
  public setXPos(xPos: number): void {
    this.xPos = xPos;
  }

  /**
   * Setter for the y poosition
   *
   * @param yPos new y position of the screen
   */
  public setYPos(yPos: number): void {
    this.yPos = yPos;
  }

  /**
   * Getter for the image
   *
   * @returns the image
   */
  public getImage(): CanvasImageSource {
    return this.img;
  }

  /**
   * Setter for the image
   *
   * @param imgSrc - string with the source of the new image
   */
  public setImage(imgSrc: string): void {
    this.img.src = imgSrc;
  }
}
