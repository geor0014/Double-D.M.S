import GameLoop from './GameLoop.js';
import StartScreen from './StartScreen.js';

export default class Game {
  private canvas: HTMLCanvasElement;

  // game loop
  private gameLoop: GameLoop;

  // private player: Player;

  /**
   * Initialize the game
   *
   * @param canvas - The canvas element that the game
   * should be rendered upon
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    window.addEventListener('resize', this.resizeCanvas());

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

  public resizeCanvas(): any {
    console.log('resized');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}
