import GameLoop from './GameLoop.js';
import Hallway from './Hallway.js';
import Player from './Player.js';
import Candy from './Candy.js';

export default class Game {
  private randomNumber: number;

  private canvas: HTMLCanvasElement;

  // public readonly userData: UserData;

  // game loop
  private gameLoop: GameLoop;

  private player: Player;

  /**
   * Initialize the game
   *
   * @param canvas - The canvas element that the game
   * should be rendered upon
   */
  public constructor(canvas: HTMLCanvasElement) {
    // this.userData = new UserData();
    this.canvas = canvas;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.player = new Player(this.canvas);

    // Start the game cycle
    // this.loop();
    this.gameLoop = new GameLoop();
    this.gameLoop.start(new Hallway(this.canvas, this.player));
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
