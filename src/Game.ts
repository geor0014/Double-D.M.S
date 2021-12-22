import GameLoop from './GameLoop.js';
import Hallway from './Hallway.js';
import Player from './Player.js';

export default class Game {
  private canvas: HTMLCanvasElement;

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
    this.canvas = canvas;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.player = new Player(this.canvas);

    // Start the game cycle
    this.gameLoop = new GameLoop();
    this.gameLoop.start(new Hallway(this.canvas, this.player));
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
