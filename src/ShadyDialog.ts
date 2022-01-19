import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
import Scene from './Scene.js';
import Room from './Room.js';
import Dialog from './Dialog.js';
import SadEnding from './SadEnding.js';

export default class ShadyDialog extends Screen {
  private keyboard: KeyListener;

  private previousScene: Room;

  private dialogs: Dialog[];

  private nextD: boolean;

  private dCounter: number;

  private frameCounter: number = 0;

  private okPressed: boolean;

  private textToPresent: string;

  private characterNum: number;

  /**
   * Creates new Dialog screen
   *
   * @param canvas passes the canvas to Screen
   * @param previousScene rerturns player to previous screen
   * @param dialogs an array of dialogs string
   * @param characterNum number of character
   */
  constructor(
    canvas: HTMLCanvasElement,
    previousScene: Room,
    dialogs: Dialog[],
    characterNum:number
  ) {
    super(canvas, './assets/img/dialogscreen-Shady.png');

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

    this.okPressed = false;

    // sets the background image position
    this.setXPos(0);
    this.setYPos(0);

    this.textToPresent = '...';

    this.characterNum = characterNum;
  }

  /**
   * checks if player chose an answer
   *
   * @returns number pressed
   */
  public reciveAnswer(): number {
    if (this.keyboard.isKeyDown(KeyListener.KEY_1)) {
      this.okPressed = true;
      return 1;
    }

    if (this.keyboard.isKeyDown(KeyListener.KEY_2)) {
      this.okPressed = true;
      return 2;
    }
    return 0;
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
      this.frameCounter === 15
    ) {
      this.dCounter += 1;
      this.textToPresent = '...';
    }
    // checks if answer was registered and player pressed ok with frame count
    let answerRecived = 0;
    if (this.frameCounter % 15 === 0) {
      if (this.okPressed === false) {
        answerRecived = this.reciveAnswer();
      }
      // console.log(`answer Recived ${answerRecived}`);
      if (answerRecived !== 0 && this.okPressed === true) {
        if (this.dCounter === this.dialogs.length - 1) {
          if (answerRecived === 1) {
            return new SadEnding(this.canvas, this.characterNum);
          }
          this.textToPresent = `${this.dialogs[this.dCounter].getReplies()[1]}`;
        } else if (answerRecived === 1) {
          this.textToPresent = `${this.dialogs[this.dCounter].getReplies()[0]}`;
        } else {
          this.textToPresent = `${this.dialogs[this.dCounter].getReplies()[1]}`;
        }
      }
      answerRecived = 0;
    }

    // resets the frame counter after it got to 10
    if (this.frameCounter === 15) {
      this.frameCounter = 0;
    }

    this.frameCounter += 1;
    this.okPressed = false;
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
        'Grey'
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

      for (let j = 0; j < 2; j += 1) {
        textToWrite = `${j + 1} ${this.dialogs[this.dCounter].getAnswers()[j]}`;
        this.writeTextToCanvas(
          textToWrite,
          24,
          this.canvas.width / 5,
          textHPos + 20,
          'left',
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
        'Grey'
      );
    } else {
      this.writeTextToCanvas(
        'Next - right arrow ->',
        24,
        this.canvas.width / 2 + 200,
        420,
        'center',
        'Grey'
      );
    }
    this.writeTextToCanvas(
      this.textToPresent,
      30,
      this.canvas.width / 3,
      this.canvas.height / 4,
      'center',
      'red'
    );
  }
}
