import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Candy from './Candy.js';
import Hint from './Hint.js';

export default class ClassRoom1 extends Room {
  private previousScene: Scene;

  /**
   * creats a new classroom
   *
   * @param canvas canvas element
   * @param player a player
   */
  public constructor(canvas: HTMLCanvasElement, previousScene: Scene) {
    super(canvas, './assets/img/classroom.png');
    this.previousScene = previousScene;

    this.setXPos(canvas.width / 4);
    this.setYPos(0);

    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    this.doors.push(new Door('./assets/img/door1.png', 864, 300));
    this.player.setXPos(858);
    this.player.setYPos(334);
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
    console.log('candy amount' + this.userData.getCandyAmount());

    if (this.player.isInteracting()) {
      this.collectibles.forEach((item) => {
        if (this.player.collidesWith(item)) {
          this.collectCollectibles();
          if (item instanceof Candy) {
            this.userData.setCandyAmount(this.userData.getCandyAmount() + 1);
            console.log(this.userData.getCandyAmount());
          } else if (item instanceof Hint) {
            this.userData.setHintAmount(this.userData.getHintAmount() + 1);
            console.log(this.userData.getHintAmount());
          }
        }
      });

      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          this.doorClose.play();
          console.log(this.previousScene);
          return this.previousScene;
        }
      }
    }

    return null;
  }
}
