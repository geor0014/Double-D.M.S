// import Player from './Player.js';
import Room from './Room.js';
import Door from './Door.js';
import Npc from './Npc.js';
import Candy from './Candy.js';
import Hint from './Hint.js';
import Scene from './Scene.js';
import DialogScreen from './DialogScreen.js';
import EasyHallway from './EasyHallway.js';
import DifficultHallway from './DifficultHallway.js';
import Player from './Player.js';
import HintScreen from './HintScreen.js';
import BossRoom from './BossRoom.js';

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

    this.player = new Player(this.canvas);
    this.player.setXPos(729);
    this.player.setYPos(488);
    this.player.setImage('./assets/img/player-boy-up.png');

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
    this.generalInteraction();
    // console.log(this.player.getXPos(), this.player.getYPos());

    if (
      this.player.isReadingHint() &&
      this.player.getUserData().getHintAmount() > 0
    ) {
      this.player
        .getUserData()
        .setHintAmount(this.player.getUserData().getHintAmount() - 1);
      console.log(this.player.getUserData().getHintAmount());
      return new HintScreen(this.canvas, this, 2);
    }

    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          this.doorOpen.play();
          return new BossRoom(this.canvas, this, this.player);
        }
      }

      // WITH NPC
      for (let i = 0; i < this.npcs.length; i += 1) {
        if (this.player.collidesWith(this.npcs[i])) {
          console.log('interact with npc');
          this.player.setXPos(this.player.getXPos() - 50);
          this.player.setYPos(this.player.getYPos() + 50);
          return new DialogScreen(this.canvas, this);
        }
      }
    }

    if (this.player.getXPos() <= 45 && this.player.getYPos() <= 364.5) {
      return new EasyHallway(this.canvas, this, this.player);
    }

    if (this.player.getXPos() >= 1410 && this.player.getYPos() <= 376) {
      return new DifficultHallway(this.canvas, this, this.player);
    }

    return null;
  }

  public render(): void {
    this.draw(this.ctx);
    super.render();
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
