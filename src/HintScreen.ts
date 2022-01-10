import Scene from './Scene.js';
import Screen from './Screen.js';
import Room from './Room.js';
import KeyListener from './KeyListener.js';

export default class HintScreen extends Screen {
  private previousScene: Room;

  private hintNum: number;

  private hints: string[];

  private keyboard: KeyListener;

  constructor(canvas: HTMLCanvasElement, previousSceen: Room, hintNum: number) {
    super(canvas, './assets/img/hint-screen.png');
    this.previousScene = previousSceen;

    this.keyboard = new KeyListener();

    this.hintNum = hintNum;
    this.setXPos(0);
    this.setYPos(0);

    this.hints = ['a', 'b', 'c', 'd', 'e'];
  }

  public processInput(): boolean {
    if (this.keyboard.isKeyDown(KeyListener.KEY_H)) {
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

  public render(): void {
    this.draw(this.ctx);
    this.writeTextToCanvas(
      this.hints[this.hintNum],
      30,
      this.canvas.width / 2,
      this.canvas.height / 2,
      'center',
      'black'
    );
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
  }
}
