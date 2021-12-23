import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
import Scene from './Scene.js';
import Hallway from './Hallway.js';

export default class DialogScreen extends Screen {
  private keyboard: KeyListener;

  // private previousScene: Hallway;

  private dialogBubbles: string[];

  constructor(canvas: HTMLCanvasElement, previousScene: Hallway) {
    super(canvas, './assets/img/dialogscreen.jpg');
    this.keyboard = new KeyListener();
    // this.previousScene = previousScene;
    this.dialogBubbles = [];

    this.dialogBubbles.push('Hey Good Morning!');
    this.dialogBubbles.push('Welcome to school, please go to class!');
    // this.countdown = this.dialogBubbles.length;

    this.setXPos(0);
    this.setYPos(0);
    console.log('hello');

    // this.next = false;
  }

  public processInput(): boolean {
    if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
      return true;
    }
    return false;
  }

  public update(elapsed: number): Scene {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.processInput()) {
      return new Hallway(this.canvas);
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

  public render(): void {
    this.draw(this.ctx);
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
