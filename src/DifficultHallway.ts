import Room from './Room.js';
import Scene from './Scene.js';
import Player from './Player.js';
import Door from './Door.js';
import ClassRoom4 from './Classroom4.js';
import ClassRoom5 from './Classroom5.js';
import ClassRoom6 from './Classroom6.js';
import HintScreen from './HintScreen.js';
import Dialog from './Dialog.js';
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
    player: Player
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
      new Npc('./assets/img/student-grey-hair-back-faced.png', 766, 430, [
        new Dialog('Heyy how are you today?'),
        new Dialog('Good luck with your exams!'),
      ])
    );

    this.npcs.push(
      new Npc('./assets/img/student-blue-hair-faced.png', 432, 322, [
        new Dialog('Heyy how are you today?'),
        new Dialog('Good luck with your exams!'),
      ])
    );

    this.player.setXPos(13);
    this.player.setYPos(335);

    this.doors.push(new Door('./assets/img/door1.png', 343, 267));
    this.doors.push(new Door('./assets/img/door1.png', 493, 267));
    this.doors.push(new Door('./assets/img/door1.png', 688, 267));
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
    const nextScene: Scene = this.generalInteraction();

    // LEAVES DIFFICULT HALLWAY
    if (this.player.getXPos() <= 12 && this.player.getYPos() >= 334.5) {
      this.player.setXPos(1060);
      this.player.setYPos(443.5);
      this.player.setImage('./assets/img/player-boy-left.png');
      return this.mainHallway;
    }

    // INTERACTIONS
    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          this.doorOpen.play();
          if (i === 0) {
            return new ClassRoom4(
              this.canvas,
              this,
              this.player,
              this.isMenuShowing
            );
          }
          if (i === 1) {
            return new ClassRoom5(
              this.canvas,
              this,
              this.player,
              this.isMenuShowing
            );
          }
          if (i === 2) {
            return new ClassRoom6(
              this.canvas,
              this,
              this.player,
              this.isMenuShowing
            );
          }
        }
      }

      // WITH NPC
    }
    if (nextScene !== null) {
      return nextScene;
    }
    return null;
  }

  /**
   * Renders the gdifficult hallway
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
