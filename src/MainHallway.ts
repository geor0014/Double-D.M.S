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
import QuestItem from './QuestItem.js';
import Cafeteria from './Cafeteria.js';

export default class MainHallway extends Room {
  // boolean to create the boss room once only
  private bRoomInteract: boolean;

  // the bossroom itself
  private bossRoom: BossRoom;

  // boolean to create the easy hallway once only
  private eHallInteract: boolean;

  // the easy hallway itself
  private easyHall: EasyHallway;

  // boolean to create the difficult hallway once only
  private dHallInteract: boolean;

  // the difficult hallway itself
  private diffHall: DifficultHallway;

  // quest item backpack
  private backpack: QuestItem;

  // boolean so the doll only appears once
  private pushOnce: boolean = true;

  // text which shows on the canvas upon entering if not enough score
  private textToPresent: string = '';

  // boolean to create the cafeteria once only
  private cafeteriaBool: boolean = false;

  // the cafeteria itself
  private cafeteria: Cafeteria;

  /**
   * creats a new hallway
   *
   * @param canvas canvas element
   * @param charaterNum number of character chosen
   */
  public constructor(canvas: HTMLCanvasElement, charaterNum: number) {
    super(canvas, './assets/img/hallway.png');
    // setting all rooms to not interact
    this.bRoomInteract = false;
    this.eHallInteract = false;
    this.dHallInteract = false;
    // sets background image position
    this.setXPos(0);
    this.setYPos(0);

    // creating the new player and sets its position and image
    this.player = new Player(this.canvas, charaterNum);
    this.player.setXPos(532);
    this.player.setYPos(681.5);

    // reseting the items in the room
    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    // creating collectibles
    this.collectibles.push(
      new Candy(312, 376.5),
      new Hint(this.canvas.width / 3, this.canvas.height / 1.5),
    );

    // creating the door
    this.doors.push(new Door('./assets/img/bossRoomDoorClosed.png', 511, 412));
    this.doors.push(new Door('./assets/img/cafeteriaDoor.png', 284, 160));

    // creating Npc and dialog
    this.npcs.push(
      new Npc('./assets/img/teacherFrontFacing.png', 782, 315.5, [
        new Dialog(
          'Heyy how are you today?#',
          ['Good Thank you!', 'Excited for my birthday!'],
          ['Glad to hear that', 'Happy Birthday!'],
        ),
        new Dialog(
          'Good luck with your exams!#',
          ['Thanks!', 'Thank you'],
          ['', ''],
        ),
      ]),
    );

    // creates the backpack
    this.backpack = new QuestItem(
      'backpack',
      './assets/img/backpack.png',
      682,
      318.5,
    );

    // sets the music of the footsteps of the player
    this.player.setWalkPath('./assets/sound/stoneWalk.ogg');

    // console.log(this.player.getWalkPath());

    // Adds all the hitboxes to the bathroom
    this.insertHitbox(382, 101, 300, 300, 1);
    this.insertHitbox(176, 102, 170, 105, 1);
    this.insertHitbox(150, 260, 50, 200, 1);
    this.insertHitbox(920, 265, 50, 180, 1);
    this.insertHitbox(728, 114, 220, 105, 1);
    this.insertHitbox(149, 560, 50, 205, 1);
    this.insertHitbox(239, 704, 230, 50, 1);
    this.insertHitbox(504, 755, 50, 5, 1);
    this.insertHitbox(594, 705, 350, 5, 1);
    this.insertHitbox(914, 553, 5, 100, 1);
  }

  /**
   * Game cycle, basically loop that keeps the game running. It contains all
   * the logic needed to draw the individual frames.
   *
   * @param elapsed a number
   * @returns a scene or null
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    const nextScene: Scene = this.generalInteraction();

    if (this.player.getUserData().getScore() > 12) {
      this.doors[0].setImage('./assets/img/bossRoomDoorOpened.png');
    }
    // console.log(this.player.getXPos(), this.player.getYPos());
    if (this.player.isInteracting()) {
      // WITH DOORS
      // for (let i = 0; i < this.doors.length; i += 1) {
      if (this.player.collidesWith(this.doors[0])) {
        if (this.player.getUserData().getScore() < 12) {
          // console.log('interact with door');

          this.doorOpen.play();
          if (this.bRoomInteract === false) {
            this.bossRoom = new BossRoom(this.canvas, this, this.player);
            this.bRoomInteract = true;
          }
          return this.bossRoom;
        }
        this.textToPresent = 'You cant access this room! maybe youre not worthy enough (evil laugh)';
        // WITH CAFETERIA
      } else if (this.player.collidesWith(this.doors[1])) {
        this.doorOpen.play();
        if (this.cafeteriaBool === false) {
          this.cafeteria = new Cafeteria(this.canvas, this, this.player, false);
          this.cafeteriaBool = true;
        }

        // sets player position when entering
        this.player.setXPos(896);
        this.player.setYPos(481);
        return this.cafeteria;
      }
      // }
    }

    // Entrance for the hallway on the left hand side
    if (this.player.getXPos() <= 162 && this.player.getYPos() >= 413.5) {
      if (this.eHallInteract === false) {
        this.easyHall = new EasyHallway(this.canvas, this, this.player);
        this.eHallInteract = true;
      }
      // PLAYER POSITION UPON ENTERING easy hall
      this.player.setXPos(967);
      this.player.setYPos(358);
      return this.easyHall;
    }

    // Entrance for the hallway on the right hand side
    if (this.player.getXPos() >= 909 && this.player.getYPos() >= 402.5) {
      if (this.player.getUserData().getScore() < 3) {
        if (this.dHallInteract === false) {
          this.diffHall = new DifficultHallway(this.canvas, this, this.player);
          this.dHallInteract = true;
        }
        // PLAYER POSITTION UPON ENTERING difficult hall
        this.player.setXPos(101);
        this.player.setYPos(335);
        return this.diffHall;
      }
      this.textToPresent = 'Sorry you cant enter here yet you need at least 4 points!';
    }
    this.addQuestItems();
    // according to the general checks in room
    if (nextScene !== null) {
      return nextScene;
    }

    return null;
  }

  /**
   * Adds the ques items to the array
   */
  private addQuestItems(): void {
    // CREATES BACKPACK
    if (this.pushOnce === true) {
      this.player
        .getUserData()
        .getQuests()
        .forEach((quest) => {
          if (quest === 'Find backpack') {
            this.player.getUserData().getQuestItems().push(this.backpack);
            this.pushOnce = false;
          }
        });
    }
  }

  /**
   * Renders the main hallway
   */
  public render(): void {
    this.draw(this.ctx);

    // DRAWS QUESTITEMS
    this.player
      .getUserData()
      .getQuestItems()
      .forEach((item) => {
        if (item.getName() === 'backpack') item.draw(this.ctx);
      });

    super.render();

    this.drawHitBoxes();

    // console.log(textToWrite);
    this.writeTextToCanvas(
      this.textToPresent,
      24,
      this.canvas.width / 2,
      75,
      'center',
      'red',
    );

    // resets the text to show on the canvas
    this.textToPresent = '';

    // console.log(this.player.getXPos(), this.player.getYPos());
  }
}
