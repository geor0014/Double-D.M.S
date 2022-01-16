// import Player from './Player.js';
import Room from './Room.js';
import Door from './Door.js';
import Npc from './Npc.js';
import Candy from './Candy.js';
import Hint from './Hint.js';
import Scene from './Scene.js';
import EasyHallway from './EasyHallway.js';
import DifficultHallway from './DifficultHallway.js';
import Player from './Player.js';
import BossRoom from './BossRoom.js';
import Dialog from './Dialog.js';
import Hitbox from './Hitbox.js';

export default class MainHallway extends Room {
  private bRoomInteract: boolean;

  private bossRoom: BossRoom;

  private eHallInteract: boolean;

  private easyHall: EasyHallway;

  private dHallInteract: boolean;

  private diffHall: DifficultHallway;

  /**
   * creats a new hallway
   *
   * @param canvas canvas element
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas, './assets/img/hallway.png');
    // setting all rooms to not interact
    this.bRoomInteract = false;
    this.eHallInteract = false;
    this.dHallInteract = false;
    // sets background image position
    this.setXPos(0);
    this.setYPos(0);

    // creating the new player and sets its position and image
    this.player = new Player(this.canvas);
    this.player.setXPos(532);
    this.player.setYPos(681.5);
    this.player.setImage('./assets/img/player-boy-up.png');

    // reseting the items in the room
    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    // creating collectibles
    this.collectibles.push(
      new Candy(this.canvas.width / 2, this.canvas.height / 2),
      new Hint(this.canvas.width / 3, this.canvas.height / 1.5)
    );

    // creating the door
    this.doors.push(new Door('./assets/img/door1.png', 530, 155));

    // creating Npc and dialog
    this.npcs.push(
      new Npc(
        './assets/img/teacher-front.png',
        this.canvas.width / 2,
        this.canvas.height - 500,
        [
          new Dialog('Heyy how are you today?#'),
          new Dialog('Good luck with your exams!#'),
        ]
      )
    );

    // HITBOX
    // this.hitboxes.push(new Hitbox(377, 377, 130, 150));
  }

  /**
   * Game cycle, basically loop that keeps the game running. It contains all
   * the logic needed to draw the individual frames.
   *
   * @param elapsed a number
   * @returns a scene or null
   */
  public update(elapsed: number): Scene {
    const nextScene: Scene = this.generalInteraction();

    // console.log(this.player.getXPos(), this.player.getYPos());
    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          if (this.player.getUserData().getScore() > -1) {
            console.log('interact with door');
            this.doorOpen.play();
            if (this.bRoomInteract === false) {
              this.bossRoom = new BossRoom(this.canvas, this, this.player);
              this.bRoomInteract = true;
            }
            return this.bossRoom;
          }
          console.log(
            'You cant accsess this room! maybe your not worthy enought (evil laugh)'
          );
        }
      }
    }

    if (this.player.getXPos() <= 14 && this.player.getYPos() >= 443.5) {
      if (this.eHallInteract === false) {
        this.easyHall = new EasyHallway(this.canvas, this, this.player);
        this.eHallInteract = true;
      }
      // PLAYER POSITTION UPON ENTERING easy hall
      this.player.setXPos(1055);
      this.player.setYPos(351.5);
      return this.easyHall;
    }

    if (this.player.getXPos() >= 1060 && this.player.getYPos() >= 443.5) {
      if (this.player.getUserData().getScore() > -1) {
        if (this.dHallInteract === false) {
          this.diffHall = new DifficultHallway(this.canvas, this, this.player);
          this.dHallInteract = true;
        }
        // PLAYER POSITTION UPON ENTERING difficult hall
        this.player.setXPos(13);
        this.player.setYPos(335);
        return this.diffHall;
      }
      console.log('Sorry you cant enter here yet you need at least 4 points!');
    }

    // according to the general checks in room
    if (nextScene !== null) {
      return nextScene;
    }

    return null;
  }

  // HITBOX DETECTION
  // /**
  //  *
  //  */
  // public processInput(): void {
  //   const move = true;
  //   const prevX = this.player.getXPos();
  //   const prevY = this.player.getYPos();

  //   this.hitboxes.forEach((box) => {
  //     if (!this.player.collidesWithHitbox(box)) {
  //       this.player.movePlayer(this.canvas);
  //     }
  //   });
  // }

  /**
   * Renders the main hallway
   */
  public render(): void {
    this.draw(this.ctx);
    super.render();

    this.hitboxes.forEach((box) => {
      box.draw(this.canvas);
    });
    // console.log(this.player.getXPos(), this.player.getYPos());
  }
}
