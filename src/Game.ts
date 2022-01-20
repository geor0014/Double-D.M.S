import GameLoop from './GameLoop.js';
import StartScreen from './StartScreen.js';

export default class Game {
  // attribute to be able to draw and store the canvas tag of the index.html
  private canvas: HTMLCanvasElement;

  // game loop
  private gameLoop: GameLoop;

  /**
   * Initialize the game
   *
   * @param canvas - The canvas element that the game
   * should be rendered upon
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    // Start the game cycle
    this.gameLoop = new GameLoop();
    this.gameLoop.start(new StartScreen(this.canvas));
  }

  /**
   * returns the canvas
   *
   * @returns canvas htmlCnvasElement
   */
  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}
