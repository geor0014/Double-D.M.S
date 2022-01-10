import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
import Scene from './Scene.js';
import Room from './Room.js';
import Question from './Question.js';

export default class QuestionScreen extends Screen {
  private keyboard: KeyListener;

  private previousScene: Room;

  private question: Question


  constructor(canvas: HTMLCanvasElement, previousScene: Room, question: Question) {
    super(canvas, './assets/img/computer-screen.png');
    this.keyboard = new KeyListener();
    this.previousScene = previousScene;
    this.question = question;

    this.setXPos(this.canvas.width / 5);
    this.setYPos(this.canvas.height / 10);
  }

  public processInput(): boolean {
    if (this.keyboard.isKeyDown(KeyListener.KEY_ESC)) {
      return true;
    }
    return false;
  }

  public update(elapsed: number): Scene {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.processInput()) {
      return this.previousScene;
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
    let textToWrite: string = '';
    let j: number = 0;
    let textHPos: number = this.canvas.height / 3;

    this.draw(this.ctx);
    this.writeTextToCanvas(
      this.question.getQTxt(),
      30,
      this.canvas.width / 3,
      textHPos,
      'center',
      'black'
    );

    for (let i = 0; i <= 2; i += 1) {
      textHPos += 50;
      console.log(`${this.question.getRPos()}`);
      if (this.question.getRPos() === i) {
        textToWrite = `${i + 1} ${this.question.getRAns()}`;
      } else if (j <= 1) {
        textToWrite = `${i + 1} ${this.question.getWAns(j)}`;
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
