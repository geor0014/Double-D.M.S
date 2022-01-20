import Room from './Room.js';
import Scene from './Scene.js';
import Player from './Player.js';
import Door from './Door.js';
import ClassRoom4 from './Classroom4.js';
import ClassRoom5 from './Classroom5.js';
import ClassRoom6 from './Classroom6.js';
import Dialog from './Dialog.js';
import Npc from './Npc.js';
import QuestItem from './QuestItem.js';

export default class DifficultHallway extends Room {
  // attribute to store the mainhallway
  private mainHallway: Room;

  // interaction for the first classroom in this hallway
  private room4Interact: boolean;

  // interaction for the second classroom in this hallway
  private room5Interact: boolean;

  // interaction for the third classroom in this hallway
  private room6Interact: boolean;

  // attribute to store the first classroom in this hallway
  private class4: ClassRoom4;

  // attribute to store the second classroom in this hallway
  private class5: ClassRoom5;

  // attribute to store the third classroom in this hallway
  private class6: ClassRoom6;

  // attribute for the doll, needed for a quest
  private doll: QuestItem;

  // boolean so the doll only appears once
  private pushOnce: boolean;

  // set frames
  private staggerFrame = 8;

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

    // console.log('creating difficult hallway');

    // sets the classrooms to not interacted
    this.room4Interact = false;
    this.room5Interact = false;
    this.room6Interact = false;

    // sets the boolean for the doll
    this.pushOnce = true;

    // sets previous scene
    this.mainHallway = mainHallway;

    // sets the player
    this.player = player;

    // resets the items in the room
    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    // sets the background image position
    this.setXPos(0);
    this.setYPos(0);

    // creates npcs with their dialogs for this room
    this.npcs.push(
      new Npc(
        './assets/img/purpleBoy.png',
        532,
        300,
        [
          new Dialog(
            'Hey there! Have you seen a teddy bear around here?#',
            ['No..', 'Dont think so...'],
            ['Oh...', 'oh...']
          ),
          new Dialog(
            'I lost mine. If you see it, can you bring it to me tomorrow?#',
            ['Sure!', 'Yeah why not'],
            ['', '']
          ),
        ],
        true
      ),
      new Npc('./assets/img/pinkLadyUp.png', 597, 500, [
        new Dialog(
          'I heard there is this weird dude in the bathroom#',
          ['really?', 'oh no...'],
          ['YES!', 'He is creepy..']
        ),
        new Dialog(
          'I am too scared to go there#',
          ['Me too!', 'Ill go!'],
          ['', '']
        ),
      ])
    );

    // creats the doors in the hallway
    this.doors.push(new Door('./assets/img/door1.png', 290, 228.5));
    this.doors.push(new Door('./assets/img/door1.png', 460, 228.5));
    this.doors.push(new Door('./assets/img/door1.png', 650, 228.5));

    // creates the doll
    this.doll = new QuestItem('doll', './assets/img/doll.png', 930, 471.5);

    // Adds all the hitboxes to the bathroom
    this.insertHitbox(105, 305, 150, 5, 1);
    this.insertHitbox(276, 176, 5, 90, 1);
    this.insertHitbox(323, 202, 650, 5, 1);
    this.insertHitbox(1002, 212, 5, 400, 1);
    this.insertHitbox(144, 551, 810, 5, 1);
    this.insertHitbox(99, 453, 41, 5, 1);
    this.insertHitbox(140, 490, 5, 5, 1);
    this.insertHitbox(854, 254, 5, 50, 1);
    this.insertHitbox(889, 345, 50, 5, 1);
    this.insertHitbox(320, 246, 500, 5, 1);

    console.log(this.npcs);
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
          if (quest === 'Help find doll') {
            this.player.getUserData().getQuestItems().push(this.doll);
            this.pushOnce = false;
          }
        });
    }
  }

  /**
   * Updates the hallway
   *
   * @param elapsed time in ms of the last frame
   * @returns null or a new room
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    // calling general checkups from Room class
    const nextScene: Scene = this.generalInteraction();
    const cNum: number = this.player.getCharacterNum();

    // renders the stars
    this.renderStars();

    // LEAVES DIFFICULT HALLWAY
    if (this.player.getXPos() <= 100 && this.player.getYPos() >= 334.5) {
      this.player.setXPos(900);
      this.player.setYPos(443.5);
      // setting image of player according to the right character chosen
      if (cNum === 1) {
        this.player.setImage('./assets/img/PlayerBoy1Left.png');
      } else if (cNum === 2) {
        this.player.setImage('./assets/img/playerBoy2Left.png');
      } else if (cNum === 3) {
        this.player.setImage('./assets/img/playerGirl2Left.png');
      } else if (cNum === 4) {
        this.player.setImage('./assets/img/playerGirl1Left.png');
      }
      // console.log('main halwway return');
      return this.mainHallway;
    }

    // INTERACTIONS
    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          // console.log('interact with door');

          // setting player starter position and image in the classrooms
          this.player.setXPos(911);
          this.player.setYPos(473);
          // setting image of player according to the right character chosen
          if (cNum === 1) {
            this.player.setImage('./assets/img/PlayerBoy1Down.png');
          } else if (cNum === 2) {
            this.player.setImage('./assets/img/playerBoy2Down.png');
          } else if (cNum === 3) {
            this.player.setImage('./assets/img/playerGirl2Down.png');
          } else if (cNum === 4) {
            this.player.setImage('./assets/img/playerGirl1Down.png');
          }
          this.doorOpen.play();
          // checking which door
          if (i === 0) {
            // if this classroom was previously entered to
            if (this.room4Interact === false) {
              this.class4 = new ClassRoom4(
                this.canvas,
                this,
                this.player,
                this.isMenuShowing
              );
              this.room4Interact = true;
            }
            return this.class4;
          }
          // checking which door
          if (i === 1) {
            // if this classroom was previously entered to
            if (this.room5Interact === false) {
              this.class5 = new ClassRoom5(
                this.canvas,
                this,
                this.player,
                this.isMenuShowing
              );
              this.room5Interact = true;
            }

            return this.class5;
          }
          // checking which door
          if (i === 2) {
            // if this classroom was previously entered to
            if (this.room6Interact === false) {
              this.class6 = new ClassRoom6(
                this.canvas,
                this,
                this.player,
                this.isMenuShowing
              );
              this.room6Interact = true;
            }
            return this.class6;
          }
        }
      }
    }

    // CREATES QUEST ITEMS
    this.addQuestItems();

    // according to the general checks in room
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
    // DRAWS QUESTITEMS
    this.player
      .getUserData()
      .getQuestItems()
      .forEach((item) => {
        if (item.getName() === 'doll') item.draw(this.ctx);
      });

    // calls the render function of the parent
    super.render();

    this.drawHitBoxes();
  }

  private renderStars(): void {
    // STAR RENDERING
    this.gameFrame += 1;
    if (this.gameFrame % this.staggerFrame === 0) {
      if (this.frameX < 9) {
        this.frameX += 1;
      } else {
        this.frameX = 0;
      }
    }
    // passes the frame to the NPC class
    this.npcs[0].setFrameX(this.frameX);
  }
}
