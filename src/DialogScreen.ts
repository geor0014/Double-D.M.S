import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
import Scene from './Scene.js';
import MainHallway from './MainHallway.js';
import Dialog from './Dialog.js';

export default class DialogScreen extends Screen {
  private keyboard: KeyListener;

  private previousScene: MainHallway;

  private dialogs: Dialog[];

  private nextD: boolean;

  private dCounter: number;

  private frameCounter: number = 0;

  /**
   *
   * @param canvas passes the canvas to Screen
   * @param previousScene rerturns player to previous screen
   */
  constructor(
    canvas: HTMLCanvasElement,
    previousScene: MainHallway,
    dialogs: Dialog[]
  ) {
    super(canvas, './assets/img/dialogscreen.png');
    this.keyboard = new KeyListener();
    this.previousScene = previousScene;
    this.dialogs = dialogs;
    this.nextD = false;
    this.dCounter = 0;

    this.setXPos(0);
    this.setYPos(0);
  }

  /**
   *
   * @returns if player pressed space key
   */
  public processInput(): boolean {
    if (this.keyboard.isKeyDown(KeyListener.KEY_ESC)) {
      return true;
    }
    return false;
  }

  public moveBetweenDialogs(): void {
    if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)) {
      console.log('right pressed');
      this.nextD = true;
    } else {
      this.nextD = false;
    }
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
    this.moveBetweenDialogs();
    if (
      this.nextD &&
      this.dCounter < this.dialogs.length - 1 &&
      this.frameCounter === 10
    ) {
      this.dCounter += 1;
    }

    if (this.frameCounter === 10) {
      this.frameCounter = 0;
    }
    this.frameCounter += 1;
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
    if (this.dCounter < this.dialogs.length) {
      let textToWrite: string = '';
      // let j: number = 0;
      let textHPos: number = this.canvas.height / 2.5;
      const textWPos: number = this.canvas.width / 3.5;

      for (let i = 0; i < 3; i += 1) {
        textToWrite = this.dialogs[this.dCounter].getText(i);
        // console.log(textToWrite);
        this.writeTextToCanvas(
          textToWrite,
          30,
          textWPos + 150,
          textHPos,
          'center',
          'black'
        );
        textHPos += 50;
      }
    }
  }
}
