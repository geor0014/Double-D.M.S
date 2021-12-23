import Door from './Door.js';
import Hallway from './Hallway.js';
import Room from './Room.js';
import Scene from './Scene.js';

export default class ClassRoom1 extends Room {
  /**
   * creats a new classroom
   *
   * @param canvas canvas element
   * @param player a player
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas, './assets/img/classroom.png');
    this.setXPos(canvas.width / 4);
    this.setYPos(0);

    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    this.doors.push(new Door('./assets/img/door1.png', 864, 300));
    this.player.setXPos(858);
    this.player.setYPos(334);
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

    /* if (
      this.player.getXPos() >= this.xPos
      && this.player.getXPos() <= this.xPos + this.imageWidth
      && this.player.getYPos() >= this.yPos
      && this.player.getYPos() <= this.yPos + this.imageHeight
    ) {
      // Move the player
      this.processInput();
    }
    */
    if (this.player.isInteracting()) {
      this.collectibles.forEach((item) => {
        if (this.player.collidesWith(item)) {
          this.collectCollectibles();
        }
      });

      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          this.doorClose.play();
          return (new Hallway(this.canvas));
        }
      }
    }

    return null;
  }
}
