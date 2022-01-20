import Scene from './Scene.js';
import Room from './Room.js';
import Dialog from './Dialog.js';
import UserData from './UserData.js';
import DialogParent from './DialogParent.js';

export default class CandyBuyDialog extends DialogParent {
  // stay!!
  // attribute for the userdata to know about the hints
  private userData: UserData;

  /**
     * Creates new Dialog screen
     *
     * @param canvas passes the canvas to Screen
     * @param previousScene rerturns player to previous screen
     * @param dialogs an array of dialogs string
     * @param userData user data
     */
  public constructor(
    canvas: HTMLCanvasElement,
    previousScene: Room,
    dialogs: Dialog[],
    userData: UserData,
  ) {
    super(canvas, previousScene, dialogs, './assets/img/lunchLadyDialog.png');
    // sets the userdata
    this.userData = userData;
  }

  /**
   * Update method
   *
   * @param elapsed time elapsed
   * @returns previous Scene
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    const candyAmount: number = this.userData.getCandyAmount();
    const hintAmount: number = this.userData.getHintAmount();
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
      && this.getFrameCounter() === 15
    ) {
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
            if (this.userData.getCandyAmount() > 1) {
              this.userData.setCandyAmount(candyAmount - 2);
              this.userData.setHintAmount(hintAmount + 1);
              this.setTextToPresent(this.getDialogs()[this.getTCounter()].getReplies()[0]);
            } else {
              this.setTextToPresent('You dont have enough candy, 2 candy for 1 hint');
            }
          } else if (answerRecived === 2) {
            this.setTextToPresent(this.getDialogs()[this.getTCounter()].getReplies()[1]);
          }
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
    this.setOkPressed(false);
    return null;
  }
}
