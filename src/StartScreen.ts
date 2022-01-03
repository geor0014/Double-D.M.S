import MainHallway from './MainHallway.js';
import KeyListener from './KeyListener.js';
import Scene from './Scene.js';
import Screen from './Screen.js';

export default class StartScreen extends Screen {
  private keyListener: KeyListener;

  private music: HTMLAudioElement;

  /**
   * Initialises every attribute
   *
   * @param canvas of the game
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas, './assets/img/school-front.png');

    this.music = new Audio('./assets/sound/StartScreen.mp3');
    this.music.play();

    this.keyListener = new KeyListener();

    this.setXPos(this.canvas.width / 4);
    this.setYPos(this.canvas.height / 4 - 50);
  }

  /**
   * Checks if the keyboard is pressed
   *
   * @returns true if space is pressed
   */
  public processInput(): boolean {
    if (this.keyListener.isKeyDown(KeyListener.KEY_SPACE)) {
      this.music.pause();
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
      return new MainHallway(this.canvas);
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
