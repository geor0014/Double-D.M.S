import Room from './Room.js';
import Scene from './Scene.js';
import Player from './Player.js';
import Door from './Door.js';
import ClassRoom4 from './Classroom4.js';
import ClassRoom5 from './Classroom5.js';
import ClassRoom6 from './Classroom6.js';
import HintScreen from './HintScreen.js';
import DialogScreen from './DialogScreen.js';
import Npc from './Npc.js';

export default class DifficultHallway extends Room {
  private mainHallway: Room;

  /**
   * Initialises every attribute
   *
   * @param canvas of the game
   * @param mainHallway of the game
   * @param player of the game
   */
  public constructor(
    canvas: HTMLCanvasElement,
    mainHallway: Room,
    player: Player,
  ) {
    super(canvas, './assets/img/difficultHallway.png');

    console.log('creating difficult hallway');

    this.mainHallway = mainHallway;

    this.player = player;

    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    this.setXPos(0);
    this.setYPos(0);

    this.npcs.push(
      new Npc(
        './assets/img/student-grey-hair-back-faced.png',
        766,
        450,
      ),
    );

    this.npcs.push(
      new Npc(
        './assets/img/student-blue-hair-faced.png',
        1264,
        458,
      ),
    );

    this.player.setXPos(13);
    this.player.setYPos(335);

    this.doors.push(new Door('./assets/img/door1.png', 332, 130));
    this.doors.push(new Door('./assets/img/door1.png', 532, 130));
    this.doors.push(new Door('./assets/img/door1.png', 732, 130));
  }

  /**
   * Methos to detect the input of the player
   */
  public processInput(): void {
    if (this.player.getYPos() > 292 && this.player.getYPos() < 425.5) {
      this.player.movePlayer(this.canvas);
      if (this.player.getYPos() <= 292) {
        this.player.setYPos(294);
      }
      if (this.player.getYPos() >= 425.5) {
        this.player.setYPos(423);
      }
    }
  }

  /**
   * Updates the difficul hallway
   *
   * @param elapsed time in ms of the last frame
   * @returns null or a new room
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    // calling general checkups from Room class
    this.generalInteraction();

    // LEAVES DIFFICULT HALLWAY
    if (this.player.getXPos() <= 12 && this.player.getYPos() >= 334.5) {
      this.player.setXPos(1060);
      this.player.setYPos(443.5);
      this.player.setImage('./assets/img/player-boy-left.png');
      return this.mainHallway;
    }

    // READING HINT
    if (
      this.player.isReadingHint()
      && this.player.getUserData().getHintAmount() > 0
    ) {
      this.player
        .getUserData()
        .setHintAmount(this.player.getUserData().getHintAmount() - 1);
      console.log(this.player.getUserData().getHintAmount());
      return new HintScreen(this.canvas, this, 2);
    }

    // INTERACTIONS
    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          this.doorOpen.play();
          if (i === 0) {
            return new ClassRoom4(this.canvas, this, this.player, this.isMenuShowing);
          }
          if (i === 1) {
            return new ClassRoom5(this.canvas, this, this.player, this.isMenuShowing);
          }
          if (i === 2) {
            return new ClassRoom6(this.canvas, this, this.player, this.isMenuShowing);
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

  /**
<<<<<<< HEAD
   * Renders the gdifficult hallway
=======
   * draws everything
>>>>>>> e7b1cd3029958609a24eef98d936b1e6cab24fd9
   */
  public render(): void {
    this.draw(this.ctx);
    super.render();
  }
  /*
  public drawRectengles(): void {
    this.ctx.beginPath();
    this.ctx.rect(0, 433, 50, 50);
    this.ctx.stroke();
  }
  */
}
