import Screen from './Screen.js';
import KeyListener from './KeyListener.js';
import MainHallway from './MainHallway.js';
import Scene from './Scene.js';

export default class InstructionScreen extends Screen {
  private keyListener: KeyListener;

  private characterNum: number;

  /**
   * Creates a new start screen
   *
   * @param canvas of the game
   * @param characterNum number of character
   */
  public constructor(canvas: HTMLCanvasElement, characterNum: number) {
    super(canvas, './assets/img/ControlsScreen.png');
    this.characterNum = characterNum;

    // creates keylistener
    this.keyListener = new KeyListener();

    // sets backgroung image position
    this.setXPos(0);
    this.setYPos(0);
    // console.log(this.getImage().width, this.getImage().height);
  }

  /**
   * Checks if the keyboard is pressed
   *
   * @returns true if space is pressed
   */
  public processInput(): boolean {
    if (this.keyListener.isKeyDown(KeyListener.KEY_SPACE)) {
      return true;
    }

    return false;
  }

  /**
   * Updates the game every possible frame
   *
   * @param elapsed time in ms before the last update
   * @returns a new scene or null
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    if (this.processInput()) {
      return new MainHallway(this.canvas, this.characterNum);
    }
    return null;
  }

  /**
   * Draws the startScreen
   *
   * @param ctx of the canvas
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
  }

  /**
   * Calls every draw functionto render everything to the canvas
   */
  public render(): void {
    this.draw(this.ctx);
  }
}
