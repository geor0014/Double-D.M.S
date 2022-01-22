import Screen from './Screen.js';
import KeyListener from './KeyListener.js';
import StartScreen from './StartScreen.js';
import Scene from './Scene.js';

export default class HappyEnding extends Screen {
  // Keyboardlistener to check if a key got pressed or not
  private keyListener: KeyListener;

  // number of the character the player chose
  private characterNum: number;

  private happyTheme: HTMLAudioElement;

  /**
   * Creates a new start screen
   *
   * @param canvas of the game
   * @param characterNum number of character
   */
  public constructor(canvas: HTMLCanvasElement, characterNum: number) {
    super(canvas, '');
    this.characterNum = characterNum;

    // creates keylistener
    this.keyListener = new KeyListener();

    this.happyTheme = new Audio();
    this.happyTheme.src = './assets/sound/happyEnding.mp3';
    this.happyTheme.play();

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
    if (this.characterNum === 1) {
      this.setImage('./assets/img/happyEndingBoy1.png');
    } else if (this.characterNum === 2) {
      this.setImage('./assets/img/happyEndingBoy2.png');
    } else if (this.characterNum === 3) {
      this.setImage('./assets/img/happyEndingGirl2.png');
    } else if (this.characterNum === 4) {
      this.setImage('./assets/img/happyEndingGirl1.png');
    }
    if (this.processInput()) {
      return new StartScreen(this.canvas);
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
      'press SPACE to Start Again :)',
      24,
      this.canvas.width / 2,
      this.canvas.height - 50,
      'center',
      'white',
    );
  }
}
