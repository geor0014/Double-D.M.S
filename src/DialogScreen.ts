import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
import Scene from './Scene.js';
import MainHallway from './MainHallway.js';

export default class DialogScreen extends Screen {
  private keyboard: KeyListener;

  private previousScene: MainHallway;

  private dialogBubbles: string[];

  /**
   *
   * @param canvas passes the canvas to Screen
   * @param previousScene rerturns player to previous screen
   */
  constructor(canvas: HTMLCanvasElement, previousScene: MainHallway) {
    super(canvas, './assets/img/dialogscreen.png');

    this.keyboard = new KeyListener();

    this.previousScene = previousScene;

    this.dialogBubbles = [];

    this.dialogBubbles.push('Hey Good Morning!');

    this.dialogBubbles.push('Welcome to school, please go to class!');
    // this.countdown = this.dialogBubbles.length;

    this.setXPos(0);
    this.setYPos(0);
    console.log('hello');

    // this.next = false;
  }

  /**
   *
   * @returns if player pressed space key
   */
  public processInput(): boolean {
    if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param elapsed time elapsed
   * @returns previous Scene
   */
  public update(elapsed: number): Scene {
    // clears canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.processInput()) {
      return this.previousScene;
    }
    return null;
  }

  /**
   * Draw the room
   *
   * @param ctx of the canvas
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
  }

  /**
   * draws everything on screen
   */
  public render(): void {
    this.draw(this.ctx);

    // Writes dialog to screen
    this.writeTextToCanvas(
      this.dialogBubbles[0],
      30,
      this.canvas.width / 2,
      this.canvas.height / 2,
      'center',
      'black'
    );
    // if (this.processInput() && this.countdown > 0) {
    //  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //  this.draw(this.ctx);
    // this.writeTextToCanvas(this.dialogBubbles[1], 24, this.canvas.width / 2,
    // this.canvas.height / 2, 'center', 'black');
    //  this.countdown -= 1;
    // }
  }
}
