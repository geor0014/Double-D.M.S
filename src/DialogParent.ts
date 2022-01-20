import InteractiveScreen from './InteractiveScreen.js';
import Scene from './Scene.js';
import Room from './Room.js';
import Dialog from './Dialog.js';

export default abstract class DialogParent extends InteractiveScreen {
  // Dialogs which show up on the screen
  private dialogs: Dialog[];

  /**
   * Creates new Dialog screen
   *
   * @param canvas passes the canvas to Screen
   * @param previousScene rerturns player to previous screen
   * @param dialogs an array of dialogs string
   * @param imgSrc image src string
   */
  public constructor(
    canvas: HTMLCanvasElement,
    previousScene: Room,
    dialogs: Dialog[],
    imgSrc: string,
  ) {
    super(canvas, previousScene, imgSrc);

    // sets the dialogs
    this.dialogs = dialogs;

    // sets the text to present on the canvas
    this.setTextToPresent('...');
  }

  /**
   * draws everything on screen
   */
  public render(): void {
    // draws the dialog counter and how many left
    this.draw(this.ctx);
    if (this.getTCounter() < this.dialogs.length) {
      this.writeTextToCanvas(
        `Dialog to go ${this.getTCounter() + 1} / ${this.dialogs.length}`,
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
        textToWrite = this.dialogs[this.getTCounter()].getText(i);
        // console.log(textToWrite);

        this.writeTextToCanvas(
          textToWrite,
          30,
          textWPos + 150,
          textHPos,
          'center',
          'black',
        );
        textHPos += 50;
      }

      for (let j = 0; j < 2; j += 1) {
        textToWrite = `${j + 1} ${this.dialogs[this.getTCounter()].getAnswers()[j]}`;
        this.writeTextToCanvas(
          textToWrite,
          24,
          this.canvas.width / 5,
          textHPos + 20,
          'left',
          'black',
        );
        textHPos += 50;
      }
    }

    // either shows for the next or how to quit
    if (this.getTCounter() === this.dialogs.length - 1) {
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
        'Next - right arrow ->',
        24,
        this.canvas.width / 2 + 200,
        420,
        'center',
        'Grey',
      );
    }
    this.writeTextToCanvas(
      this.getTextToPresent(),
      30,
      this.canvas.width / 3,
      this.canvas.height / 4,
      'center',
      'red',
    );
  }

  /**
   * Getter for dialogs
   *
   * @returns dialogs
   */
  public getDialogs(): Dialog[] {
    return this.dialogs;
  }

  /**
   * Setter for dialogs
   *
   * @param dialogs dialogs array
   */
  public setDialogs(dialogs: Dialog[]): void {
    this.dialogs = dialogs;
  }
}
