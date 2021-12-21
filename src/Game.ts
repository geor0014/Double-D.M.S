import UserData from './UserData.js';
import Start from './StartScreen.js';

import GameLoop from './GameLoop.js';

export default class Game {
  private randomNumber: number;

  private canvas: HTMLCanvasElement;

  public readonly userData: UserData;

  // game loop
  private gameLoop: GameLoop;

  /**
   * Initialize the game
   *
   * @param canvas - The canvas element that the game
   * should be rendered upon
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.userData = new UserData();
    this.canvas = canvas;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Start the game cycle
    // this.loop();
    this.gameLoop = new GameLoop();
    this.gameLoop.start(new Start(this));
  }

  /**
   * returns the canvas
   *
   * @returns canvas htmlCnvasElement
   */
  public getCanvas() : HTMLCanvasElement {
    return this.canvas;
  }
}
