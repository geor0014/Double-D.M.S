import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
import Scene from './Scene.js';
import Room from './Room.js';
import Question from './Question.js';

export default class QuestionScreen extends Screen {
  private keyboard: KeyListener;

  private previousScene: Room;

  private questions: Question[];

  private nextQ: boolean;

  private counter: number;


  constructor(canvas: HTMLCanvasElement, previousScene: Room, questions: Question[]) {
    super(canvas, './assets/img/computer-screen.png');
    this.keyboard = new KeyListener();
    this.previousScene = previousScene;
    this.questions = questions;
    this.nextQ = false;
    this.counter = 0;

    this.setXPos(this.canvas.width / 5);
    this.setYPos(this.canvas.height / 10);
  }

  public processInput(): boolean {
    if (this.keyboard.isKeyDown(KeyListener.KEY_ESC)) {
      return true;
    }
    return false;
  }

  public moveBetweenQuestions(): void {
    if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)) {
      console.log('right pressed');
      this.nextQ = true;
    }

    else {
      this.nextQ = false;
    }
  }

  public update(elapsed: number): Scene {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log(this.counter);

    if (this.processInput()) {
      return this.previousScene;
    }

    this.moveBetweenQuestions();
    if (this.nextQ && this.counter < this.questions.length) {
      this.counter += 1;
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

    if (this.counter < this.questions.length) {
      let textToWrite: string = '';
      let j: number = 0;
      let textHPos: number = this.canvas.height / 3;

      this.writeTextToCanvas(
        this.questions[this.counter].getQTxt(),
        30,
        this.canvas.width / 3,
        textHPos,
        'center',
        'black'
      );

      for (let i = 0; i <= 2; i += 1) {
        textHPos += 50;
        //  console.log(`${this.questions[this.counter].getRPos()}`);
        if (this.questions[this.counter].getRPos() === i) {
          textToWrite = `${i + 1} ${this.questions[this.counter].getRAns()}`;
        } else if (j <= 1) {
          textToWrite = `${i + 1} ${this.questions[this.counter].getWAns(j)}`;
          j += 1;
        }
        this.writeTextToCanvas(
          textToWrite,
          30,
          this.canvas.width / 3,
          textHPos,
          'center',
          'black'
        );
      }
    }
  }
}
