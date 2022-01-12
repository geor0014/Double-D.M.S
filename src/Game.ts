import GameLoop from './GameLoop.js';
import Player from './Player.js';
import StartScreen from './StartScreen.js';
import UserData from './UserData.js';

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
