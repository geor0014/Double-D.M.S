import GameLoop from './GameLoop.js';
import StartScreen from './StartScreen.js';
import UserData from './UserData.js';

export default class Game {
  private canvas: HTMLCanvasElement;

  // game loop
  private gameLoop: GameLoop;

  private userData: UserData;

  // private player: Player;

  /**
   * Initialize the game
   *
   * @param canvas - The canvas element that the game
   * should be rendered upon
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.userData = new UserData();

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // this.player = new Player(this.canvas);

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
