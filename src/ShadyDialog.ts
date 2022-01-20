import Scene from './Scene.js';
import Room from './Room.js';
import Dialog from './Dialog.js';
import SadEnding from './SadEnding.js';
import DialogParent from './DialogParent.js';

export default class ShadyDialog extends DialogParent {
  // number of the character the player chose
  private characterNum: number;

  /**
   * Creates new Dialog screen
   *
   * @param canvas passes the canvas to Screen
   * @param previousScene rerturns player to previous screen
   * @param dialogs an array of dialogs string
   * @param characterNum number of character
   */
  public constructor(
    canvas: HTMLCanvasElement,
    previousScene: Room,
    dialogs: Dialog[],
    characterNum: number,
  ) {
    super(canvas, previousScene, dialogs, './assets/img/dialogScreenShadyGuy.png');
    // sets the number of the character the player picked
    this.characterNum = characterNum;
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
      this.setOkPressed(false);
      this.setTCounter(this.getTCounter() + 1);
      this.setTextToPresent('...');
    }
    // checks if answer was registered and player pressed ok with frame count
    let answerRecived = 0;
    if (this.getFrameCounter() % 15 === 0) {
      if (this.getOkPressed() === false) {
        answerRecived = this.reciveAnswer();
      }
      // console.log(`answer Recived ${answerRecived}`);

      if (answerRecived !== 0 && this.getOkPressed() === true) {
        if (this.getTCounter() === this.getDialogs().length - 1) {
          if (answerRecived === 1) {
            return new SadEnding(this.canvas, this.characterNum);
          }
          this.setTextToPresent(this.getDialogs()[this.getTCounter()].getReplies()[1]);
        } else if (answerRecived === 1) {
          this.setTextToPresent(this.getDialogs()[this.getTCounter()].getReplies()[0]);
        } else if (answerRecived === 2) {
          this.setTextToPresent(this.getDialogs()[this.getTCounter()].getReplies()[1]);
        }
      }
      answerRecived = 0;
    }

    // resets the frame counter after it got to 10
    if (this.getFrameCounter() === 15) {
      this.setFrameCounter(0);
    }
    this.setFrameCounter(this.getFrameCounter() + 1);
    return null;
  }
}
