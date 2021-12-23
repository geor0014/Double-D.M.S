// import Player from './Player.js';
import Room from './Room.js';
import Door from './Door.js';
import Npc from './Npc.js';
import Candy from './Candy.js';
import Hint from './Hint.js';
import Scene from './Scene.js';
import ClassRoom1 from './Classroom1.js';
import DialogScreen from './DialogScreen.js';

export default class Hallway extends Room {
  /**
   * creats a new hallway
   *
   * @param canvas canvas element
   * @param player a player
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas, './assets/img/hallway.png');
    this.setXPos(50);
    this.setYPos(30);

    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    this.collectibles.push(
      new Candy(this.canvas.width / 2, this.canvas.height / 2)
    );
    this.collectibles.push(
      new Hint(this.canvas.width / 3, this.canvas.height / 1.5)
    );

    this.doors.push(new Door('./assets/img/door1.png', 732, 130));

    this.npcs.push(
      new Npc(
        './assets/img/teacher-front.png',
        this.canvas.width / 2,
        this.canvas.height - 500
      )
    );

    console.log('hi');
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
          this.doorOpen.play();
          return new ClassRoom1(this.canvas);
        }
      }

      for (let i = 0; i < this.npcs.length; i += 1) {
        if (this.player.collidesWith(this.npcs[i])) {
          console.log('interact with npc');
          return new DialogScreen(this.canvas, this);
        }
      }
    }
    return null;
  }
}
