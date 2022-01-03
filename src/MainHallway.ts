// import Player from './Player.js';
import Room from './Room.js';
import Door from './Door.js';
import Npc from './Npc.js';
import Candy from './Candy.js';
import Hint from './Hint.js';
import Scene from './Scene.js';
import ClassRoom1 from './Classroom1.js';
import DialogScreen from './DialogScreen.js';
import EasyHallway from './EasyHallway.js';
import DifficultHallway from './DifficultHallway.js';

export default class MainHallway extends Room {
  /**
   * creats a new hallway
   *
   * @param canvas canvas element
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas, './assets/img/hallway.png');
    this.setXPos(50);
    this.setYPos(30);

    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    this.collectibles.push(
      new Candy(this.canvas.width / 2, this.canvas.height / 2),
    );
    this.collectibles.push(
      new Hint(this.canvas.width / 3, this.canvas.height / 1.5),
    );

    this.doors.push(new Door('./assets/img/door1.png', 732, 130));

    this.npcs.push(
      new Npc(
        './assets/img/teacher-front.png',
        this.canvas.width / 2,
        this.canvas.height - 500,
      ),
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
    // console.log(this.player.getXPos(), this.player.getYPos());

    if (this.player.isInteractingMenu()) {
      if (this.isMenuShowing === true) {
        this.isMenuShowing = false;
      } else if (this.isMenuShowing === false) {
        this.isMenuShowing = true;
      }
    }

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
          this.doorOpen.play();
          this.player.setXPos(726);
          this.player.setYPos(190);
          this.player.setImage('./assets/img/player-boy-standing.png');
          return new ClassRoom1(this.canvas, this);
        }
      }

      for (let i = 0; i < this.npcs.length; i += 1) {
        if (this.player.collidesWith(this.npcs[i])) {
          console.log('interact with npc');
          this.player.setXPos(this.player.getXPos() - 50);
          this.player.setYPos(this.player.getYPos() + 50);
          return new DialogScreen(this.canvas, this, this.player);
        }
      }
    }

    if (this.player.getXPos() <= 45 && this.player.getYPos() <= 364.5) {
      return new EasyHallway(this.canvas, this);
    }

    if (this.player.getXPos() >= 1410 && this.player.getYPos() <= 376) {
      return new DifficultHallway(this.canvas, this);
    }

    return null;
  }

/*
  public drawRectengles(): void {
    // Left rect
    this.ctx.beginPath();
    this.ctx.rect(45, 364.5, 50, 50);
    this.ctx.stroke();

    // Right rect
    this.ctx.beginPath();
    this.ctx.rect(1410, 376, 50, 50);
    this.ctx.stroke();
  }
  */
}
