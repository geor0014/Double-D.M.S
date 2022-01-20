import Screen from './Screen.js';
import Scene from './Scene.js';
import ParentsScreen from './ParentsScreen.js';

import KeyListener from './KeyListener.js';

export default class CharacterPick extends Screen {
  // Keyboardlistener to check if a key got pressed or not
  private keyListener: KeyListener;

  // number of the character the player chose
  private characterNum: number;

  /**
   * Creates a new start screen
   *
   * @param canvas of the game
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas, './assets/img/characterPick.png');
    this.characterNum = 0;

    // creates keylistener
    this.keyListener = new KeyListener();

    // sets backgroung image position
    this.setXPos(0);
    this.setYPos(0);
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
   * Registers the choice of the player
   *
   * @returns number player chose
   */
  public chooseCharacter(): number {
    if (this.keyListener.isKeyDown(KeyListener.KEY_1)) {
      return 1;
    }

    if (this.keyListener.isKeyDown(KeyListener.KEY_2)) {
      return 2;
    }

    if (this.keyListener.isKeyDown(KeyListener.KEY_3)) {
      return 3;
    }

    if (this.keyListener.isKeyDown(KeyListener.KEY_4)) {
      return 4;
    }

    return 0;
  }

  /**
   * Updates the game every possible frame
   *
   * @param elapsed time in ms before the last update
   * @returns a new scene or null
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    const temp: number = this.chooseCharacter();
    if (temp !== 0) {
      this.characterNum = temp;
    }

    if (this.characterNum === 1) {
      this.setImage('./assets/img/characterPick1.png');
    } else if (this.characterNum === 2) {
      this.setImage('./assets/img/characterPick2.png');
    } else if (this.characterNum === 3) {
      this.setImage('./assets/img/characterPick3.png');
    } else if (this.characterNum === 4) {
      this.setImage('./assets/img/characterPick4.png');
    }

    if (this.characterNum !== 0) {
      if (this.processInput()) {
        return new ParentsScreen(this.canvas, this.characterNum);
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
    this.writeTextToCanvas(
      'press SPACE to choose and continue',
      24,
      this.canvas.width / 2,
      this.canvas.height - 50,
      'center',
      'white'
    );
  }
}
