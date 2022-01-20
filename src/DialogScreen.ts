import Scene from './Scene.js';
import Room from './Room.js';
import Dialog from './Dialog.js';
import DialogParent from './DialogParent.js';

export default class DialogScreen extends DialogParent {
  /**
   * Creates new Dialog screen
   *
   * @param canvas passes the canvas to Screen
   * @param previousScene rerturns player to previous screen
   * @param dialogs an array of dialogs string
   */
  public constructor(
    canvas: HTMLCanvasElement,
    previousScene: Room,
    dialogs: Dialog[],
  ) {
    super(canvas, previousScene, dialogs, './assets/img/dialogscreen.png');
  }

  /**
   * Update method
   *
   * @param elapsed time elapsed
   * @returns previous Scene
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    // clears canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // if player wants to exit dialog
    if (this.processInput()) {
      return this.getPreviousScene();
    }

    // calls to check if player wants to move to the next dialog
    this.moveBetweenInteractions();
    if (
      this.getNextText()
      && this.getTCounter() < this.getDialogs().length - 1
      && this.getFrameCounter() === 10
    ) {
      this.setTCounter(this.getTCounter() + 1);
      this.setTextToPresent('...');
    }
    // checks if answer was registered and player pressed ok with frame count
    let answerRecived = 0;
    if (this.getFrameCounter() % 10 === 0) {
      if (this.getOkPressed() === false) {
        answerRecived = this.reciveAnswer();
      }
      // console.log(`answer Recived ${answerRecived}`);
      if (answerRecived !== 0 && this.getOkPressed() === true) {
        // this.okPressed = false;
        if (answerRecived === 1) {
          this.setTextToPresent(this.getDialogs()[this.getTCounter()].getReplies()[0]);
        } else if (answerRecived === 2) {
          this.setTextToPresent(this.getDialogs()[this.getTCounter()].getReplies()[1]);
        }
      }

      answerRecived = 0;
    }

    // resets the frame counter after it got to 10
    if (this.getFrameCounter() === 10) {
      this.setFrameCounter(0);
    }
    this.setFrameCounter(this.getFrameCounter() + 1);
    this.setOkPressed(false);
    return null;
  }
}
