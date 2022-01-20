import MainHallway from './MainHallway.js';
import KeyListener from './KeyListener.js';
import Scene from './Scene.js';
import Screen from './Screen.js';
import CharacterPick from './CharacterPick.js';

export default class StartScreen extends Screen {
  private keyListener: KeyListener;

  private music: HTMLAudioElement;

  /**
   * Creates a new start screen
   *
   * @param canvas of the game
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas, './assets/img/schoolFront.png');
    // creates starter audio
    this.music = new Audio('./assets/sound/StartScreen.mp3');
    this.music.volume = 0.2;
    // this.music.play();

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
      return new CharacterPick(this.canvas);
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
    this.writeTextToCanvas(
      'press SPACE to start',
      100,
      this.canvas.width / 2,
      this.canvas.height / 2,
      'center',
      'Yellow'
    );
  }
}
