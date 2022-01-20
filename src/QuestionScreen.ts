import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
import Scene from './Scene.js';
import Room from './Room.js';
import Question from './Question.js';

export default class QuestionScreen extends Screen {
  // Keyboardlistener to check if a key got pressed or not
  private keyboard: KeyListener;

  // Room the player have previously been
  private previousScene: Room;

  // questions displayed on the screen
  private questions: Question[];

  // next question which should show up
  private nextQ: boolean;

  // counter to show what question is being doisplayed
  private qCounter: number;

  // counter for the frames
  private frameCounter: number = 0;

  // checkup if the key got pressed successfully
  private okPressed: boolean;

  // text which should show up next
  private textToPresent: string;

  /**
   * Creates new Question Screen
   *
   * @param canvas canvas
   * @param previousScene previous scene to return to
   * @param questions an array of questions string
   */
  public constructor(
    canvas: HTMLCanvasElement,
    previousScene: Room,
    questions: Question[],
  ) {
    super(canvas, './assets/img/computer-screen.png');

    // sets keylistener
    this.keyboard = new KeyListener();

    // sets the previous scene to rturn to
    this.previousScene = previousScene;

    // sets the questions
    this.questions = questions;

    // if needed to move to the next question
    this.nextQ = false;

    // sets the counter to 0
    this.qCounter = 0;

    // sets the check up boolean
    this.okPressed = false;

    // sets the background image position
    this.setXPos(0);
    this.setYPos(0);

    // sets the text to display
    this.textToPresent = 'No answer recieved';
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
   * changes if player wants to read next question
   */
  public moveBetweenQuestions(): void {
    if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)) {
      // console.log('right pressed');

      this.nextQ = true;
    } else {
      this.nextQ = false;
    }
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

    if (this.keyboard.isKeyDown(KeyListener.KEY_3)) {
      this.okPressed = true;
      return 3;
    }
    return 0;
  }

  /**
   * Update method
   *
   * @param elapsed time elapsed
   * @returns previous Scene
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    // checks if player moved to next question
    this.moveBetweenQuestions();
    if (
      this.nextQ
      && this.qCounter < this.questions.length - 1
      && this.frameCounter === 10
    ) {
      this.qCounter += 1;
      this.textToPresent = 'No answer recieved';
    }

    const userData = this.questions[this.qCounter].getUserData();
    // console.log(` frame counter ${this.frameCounter}`);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // console.log(this.qCounter);

    // if player wants to exit the dialog
    if (this.processInput()) {
      return this.previousScene;
    }

    // checks if answer was registered and player pressed ok with frame count
    let answerRecived = 0;
    if (this.frameCounter % 10 === 0) {
      if (this.okPressed === false) {
        answerRecived = this.reciveAnswer();
      }
      // console.log(`answer Recived ${answerRecived}`)

      if (answerRecived !== 0 && this.okPressed === true) {
        // this.okPressed = false;
        this.textToPresent = 'your answer has been registered, please go to the next question >>';
      }

      // check if the answer chosen is correct
      if (answerRecived === this.questions[this.qCounter].getRPos() + 1) {
        // console.log('right answer selected')

        userData.setScore(userData.getScore() + 1);
      }
      // answerRecived = 0;
    }

    // resets the frame counter after it got to 10
    if (this.frameCounter === 10) {
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
    this.draw(this.ctx);
    // draws the questions counter and how many left
    if (this.qCounter < this.questions.length) {
      this.writeTextToCanvas(
        `Q num ${this.qCounter + 1} / ${this.questions.length}`,
        24,
        this.canvas.width / 5,
        230,
        'center',
        'Red',
      );

      let textToWrite: string = '';
      let j: number = 0;
      let textHPos: number = this.canvas.height / 3 + 20;
      const textWPos: number = this.canvas.width / 5 - 20;

      // draws the question itself
      for (let i = 0; i < 3; i += 1) {
        textToWrite = this.questions[this.qCounter].getText(i);
        // console.log(textToWrite);

        this.writeTextToCanvas(
          textToWrite,
          20,
          textWPos,
          textHPos,
          'left',
          'black',
        );
        textHPos += 50;
      }

      // draws possible answers
      for (let i = 0; i <= 2; i += 1) {
        if (this.questions[this.qCounter].getRPos() === i) {
          textToWrite = `${i + 1} ${this.questions[this.qCounter].getRAns()}`;
        } else if (j <= 1) {
          textToWrite = `${i + 1} ${this.questions[this.qCounter].getWAns(j)}`;
          j += 1;
        }
        this.writeTextToCanvas(
          textToWrite,
          20,
          this.canvas.width / 5,
          textHPos + 20,
          'left',
          'black',
        );
        textHPos += 50;
      }
    }
    // either shows for the next or how to quit
    if (this.qCounter === this.questions.length - 1) {
      this.writeTextToCanvas(
        'press ESC to leave',
        24,
        this.canvas.width / 2 + 100,
        600,
        'center',
        'Red',
      );
    } else {
      this.writeTextToCanvas(
        'Next Question right arrow ->',
        24,
        this.canvas.width / 2 + 100,
        600,
        'center',
        'Red',
      );
    }

    this.writeTextToCanvas(
      this.textToPresent,
      24,
      this.canvas.width / 2,
      675,
      'center',
      'red',
    );
  }
}
