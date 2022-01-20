import Screen from './Screen.js';
import KeyListener from './KeyListener.js';
import Room from './Room.js';
import Scene from './Scene.js';

export default abstract class InteractiveScreen extends Screen {
  // Keyboardlistener so the game knows
  private keyboard: KeyListener;

  // Room the player have previously been
  private previousScene: Room;

  // boolean to show the next text in the array
  private nextText: boolean;

  // counter for all the texts
  private tCounter: number;

  // counter for the frames
  private frameCounter: number = 0;

  // boolean to check if a key got pressed or not
  private okPressed: boolean;

  // text which should show up on the canvas
  private textToPresent: string;

  /**
   * Creates new Question Screen
   *
   * @param canvas canvas
   * @param previousScene previous scene to return to
   * @param imgSrc image src string
   */
  constructor(
    canvas: HTMLCanvasElement,
    previousScene: Room,
    imgSrc: string,
  ) {
    super(canvas, imgSrc);

    // sets keylistener
    this.keyboard = new KeyListener();

    // sets the previous scene to rturn to
    this.previousScene = previousScene;

    // if needed to move to the next question
    this.nextText = false;

    // counter which question is presented
    this.tCounter = 0;

    this.okPressed = false;

    // sets the background image position
    this.setXPos(0);
    this.setYPos(0);
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
  public moveBetweenInteractions(): void {
    if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)) {
      console.log('right pressed');
      this.nextText = true;
    } else {
      this.nextText = false;
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
   * Draw the room
   *
   * @param ctx of the canvas
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
  }

  /**
   * Getter for text to present
   *
   * @returns text
   */
  public getTextToPresent(): string {
    return this.textToPresent;
  }

  /**
   * Setter for text to present
   *
   * @param text string
   */
  public setTextToPresent(text: string): void {
    this.textToPresent = text;
  }

  /**
   * Getter for previous scene
   *
   * @returns text
   */
  public getPreviousScene(): Scene {
    return this.previousScene;
  }

  /**
   * Setter for previous scene
   *
   * @param room room
   */
  public setPreviousScene(room: Room): void {
    this.previousScene = room;
  }

  /**
   * Getter for next text
   *
   * @returns boolean of next text
   */
  public getNextText(): boolean {
    return this.nextText;
  }

  /**
   * Setter for next text
   *
   * @param next boolean
   */
  public setNextText(next: boolean): void {
    this.nextText = next;
  }

  /**
   * Getter for T Counter
   *
   * @returns number of t counter
   */
  public getTCounter(): number {
    return this.tCounter;
  }

  /**
   * Setter for T Counter
   *
   * @param counter number
   */
  public setTCounter(counter: number): void {
    this.tCounter = counter;
  }

  /**
   * Getter for Frame Counter
   *
   * @returns number of frame counter
   */
  public getFrameCounter(): number {
    return this.frameCounter;
  }

  /**
   * Setter for Frame Counter
   *
   * @param counter number
   */
  public setFrameCounter(counter: number): void {
    this.frameCounter = counter;
  }

  /**
   * Getter for okPressed
   *
   * @returns boolean of okPressed
   */
  public getOkPressed(): boolean {
    return this.okPressed;
  }

  /**
   * Setter for OkPressed
   *
   * @param press boolean
   */
  public setOkPressed(press: boolean): void {
    this.okPressed = press;
  }
}
