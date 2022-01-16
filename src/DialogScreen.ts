import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
import Scene from './Scene.js';
import Room from './Room.js';
import Dialog from './Dialog.js';

export default class DialogScreen extends Screen {
  private keyboard: KeyListener;

  private previousScene: Room;

  private dialogs: Dialog[];

  private nextD: boolean;

  private dCounter: number;

  private frameCounter: number = 0;

  /**
   * Creates new Dialog screen
   *
   * @param canvas passes the canvas to Screen
   * @param previousScene rerturns player to previous screen
   * @param dialogs an array of dialogs string
   */
  constructor(
    canvas: HTMLCanvasElement,
    previousScene: Room,
    dialogs: Dialog[],
  ) {
    super(canvas, './assets/img/dialogscreen.png');

    // sets keylistener
    this.keyboard = new KeyListener();

    // sets the previous scene to rturn to
    this.previousScene = previousScene;

    // sets the dialogs
    this.dialogs = dialogs;

    // if needed to move to the next dialog
    this.nextD = false;

    // counter which dialog is presented
    this.dCounter = 0;

    // sets the background image position
    this.setXPos(0);
    this.setYPos(0);
  }

  /**
   * Checks if player wants to exit the dialog screen
   *
   * @returns if player pressed space key
   */
  public processInput(): boolean {
    if (this.keyboard.isKeyDown(KeyListener.KEY_ESC)) {
      return true;
    }
    return false;
  }

  /**
   * changes if player wants to read next dialog
   */
  public moveBetweenDialogs(): void {
    if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)) {
      console.log('right pressed');
      this.nextD = true;
    } else {
      this.nextD = false;
    }
  }

  /**
   * Update method
   *
   * @param elapsed time elapsed
   * @returns previous Scene
   */
  public update(elapsed: number): Scene {
    // clears canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // if player wants to exit dialog
    if (this.processInput()) {
      return this.previousScene;
    }

    // calls to check if player wants to move to the next dialog
    this.moveBetweenDialogs();
    if (
      this.nextD &&
      this.dCounter < this.dialogs.length - 1 &&
      this.frameCounter === 10
    ) {
      this.dCounter += 1;
    }

    // resets the frame counter after it got to 10
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
    // draws the dialog counter and how many left
    this.draw(this.ctx);
    if (this.dCounter < this.dialogs.length) {
      this.writeTextToCanvas(
        `Dialog to go ${this.dCounter + 1} / ${this.dialogs.length}`,
        24,
        this.canvas.width / 2,
        420,
        'center',
        'Grey',
      );

      let textToWrite: string = '';
      // let j: number = 0;
      let textHPos: number = this.canvas.height / 2.5;
      const textWPos: number = this.canvas.width / 3.5;

      // draws the dialog itself
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

    // either shows for the next or how to quit
    if (this.dCounter === this.dialogs.length - 1) {
      this.writeTextToCanvas(
        'press ESC to leave',
        24,
        this.canvas.width / 2 + 200,
        420,
        'center',
        'Grey',
      );
    } else {
      this.writeTextToCanvas(
        'Next - right arrow >>',
        24,
        this.canvas.width / 2 + 200,
        420,
        'center',
        'Grey',
      );
    }
  }
}
