import Room from './Room.js';
import Scene from './Scene.js';
import Player from './Player.js';
import Door from './Door.js';
import ClassRoom1 from './Classroom1.js';
import ClassRoom2 from './Classroom2.js';
import ClassRoom3 from './Classroom3.js';
import HintScreen from './HintScreen.js';
import Hint from './Hint.js';
import Candy from './Candy.js';
import DialogScreen from './DialogScreen.js';

export default class EasyHallway extends Room {
  private mainHallway: Room;

  public constructor(
    canvas: HTMLCanvasElement,
    mainHallway: Room,
    player: Player
  ) {
    super(canvas, './assets/img/easyHallway.jpg');
    console.log('creating easy hallway');
    this.mainHallway = mainHallway;

    this.player = player;

    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    this.setXPos(0);
    this.setYPos(this.canvas.height / 4);

    this.doors.push(new Door('./assets/img/door1.png', 732, 130));
    this.doors.push(new Door('./assets/img/door1.png', 532, 130));
    this.doors.push(new Door('./assets/img/door1.png', 332, 130));

    this.player.setXPos(this.canvas.width / 2);
  }

  // eslint-disable-next-line class-methods-use-this
  public update(elapsed: number): Scene {
    // Clear the screen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // LEAVES EASY HALLWAY
    if (this.player.getXPos() >= 1450 && this.player.getYPos() <= 433) {
      this.player.setXPos(132);
      this.player.setYPos(371);
      this.player.setImage('./assets/img/player-boy-right.png');
      console.log('main halwway return');
      return this.mainHallway;
    }

    // READING HINT
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

    // MENU INTERACTION
    if (this.player.isInteractingMenu()) {
      if (this.isMenuShowing === true) {
        this.isMenuShowing = false;
      } else if (this.isMenuShowing === false) {
        this.isMenuShowing = true;
      }
    }

    // INTERACTIONS
    if (this.player.isInteracting()) {
      // WITH COLLECTIBLES
      this.collectibles.forEach((item) => {
        if (this.player.collidesWith(item)) {
          this.collectCollectibles();
          if (item instanceof Candy) {
            this.player
              .getUserData()
              .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
            console.log(this.player.getUserData().getCandyAmount());
          } else if (item instanceof Hint) {
            this.player
              .getUserData()
              .setHintAmount(this.player.getUserData().getHintAmount() + 1);
            console.log(this.player.getUserData().getHintAmount());
          }
        }
      });

      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          this.doorOpen.play();
          if (i === 0) {
            return new ClassRoom1(this.canvas, this, this.player);
          }
          if (i === 1) {
            return new ClassRoom2(this.canvas, this, this.player);
          }
          if (i === 2) {
            return new ClassRoom3(this.canvas, this, this.player);
          }
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

    return null;
  }

  public render(): void {
    this.draw(this.ctx);
    super.render();
  }

  /*
  public drawRectengles(): void {
    this.ctx.beginPath();
    this.ctx.rect(1450, 433, 50, 50);
    this.ctx.stroke();
  }
  */
}
