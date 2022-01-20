import Screen from './Screen.js';
import KeyListener from './KeyListener.js';
import InstructionScreen from './InstructionScreen.js';
import Scene from './Scene.js';

export default class ParentsScreen extends Screen {
  // Keyboardlistener to check if a key got pressed or not
  private keyListener: KeyListener;

  // number of the character the player chose
  private characterNum: number;

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
      this.setImage('./assets/img/dialogParentsBoy1.png');
    } else if (this.characterNum === 2) {
      this.setImage('./assets/img/dialogParentsBoy2.png');
    } else if (this.characterNum === 3) {
      this.setImage('./assets/img/dialogParentsGirl2.png');
    } else if (this.characterNum === 4) {
      this.setImage('./assets/img/dialogParentsGirl1.png');
    }

    if (this.characterNum !== 0) {
      if (this.processInput()) {
        return new InstructionScreen(this.canvas, this.characterNum);
      }
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
