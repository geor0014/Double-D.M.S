import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Candy from './Candy.js';
import Hint from './Hint.js';

export default class ClassRoom1 extends Room {
  private previousScene: Scene;

  /**
   * creats a new classroom
   *
   * @param canvas canvas element
   * @param previousScene a scene
   * @param player a player
   */
  public constructor(canvas: HTMLCanvasElement, previousScene: Scene, player: Player) {
    super(canvas, './assets/img/classroom.png');
    this.previousScene = previousScene;

    this.player = player;

    this.setXPos(canvas.width / 4);
    this.setYPos(0);

    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    this.collectibles.push(
      new Candy(this.canvas.width / 2, this.canvas.height / 2),
    );

    this.doors.push(new Door('./assets/img/door1.png', 864, 300));
    this.player.setXPos(861);
    this.player.setYPos(365);
    this.player.setImage('./assets/img/player-boy-standing.png');
  }

  /**
   * Game cycle, basically loop that keeps the game running. It contains all
   * the logic needed to draw the individual frames.
   *
   * @param elapsed a number
   * @returns a scene or null
   */
  public update(elapsed: number): Scene {
    // Clear the screen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // console.log('candy amount' + this.userData.getCandyAmount());

    if (this.player.isInteracting()) {
      this.collectibles.forEach((item) => {
        if (this.player.collidesWith(item)) {
          this.collectCollectibles();
          if (item instanceof Candy) {
            this.player.getUserData().setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
            console.log(this.player.getUserData().getCandyAmount());
          } else if (item instanceof Hint) {
            this.player.getUserData().setHintAmount(this.player.getUserData().getHintAmount() + 1);
            console.log(this.player.getUserData().getHintAmount());
          }
        }
      });

      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          this.doorClose.play();
          console.log(this.previousScene);
          this.player.setXPos(729);
          this.player.setYPos(200);
          this.player.setImage('./assets/img/player-boy-standing.png');
          return this.previousScene;
        }
      }
    }

    return null;
  }
}
