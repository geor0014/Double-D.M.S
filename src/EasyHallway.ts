import Room from './Room.js';
import Scene from './Scene.js';
import Player from './Player.js';
import Door from './Door.js';
import ClassRoom1 from './Classroom1.js';
import ClassRoom2 from './Classroom2.js';
import ClassRoom3 from './Classroom3.js';
import Dialog from './Dialog.js';
import Npc from './Npc.js';
import Hint from './Hint.js';
import Bathroom1 from './Bathroom1.js';
import Bathroom2 from './Bathroom2.js';

export default class EasyHallway extends Room {
  private mainHallway: Room;

  private room1Interact: boolean;

  private room2Interact: boolean;

  private room3Interact: boolean;

  private bathroomInteractBoy: boolean;

  private bathroomInteractGirl: boolean;

  private class1: ClassRoom1;

  private class2: ClassRoom2;

  private class3: ClassRoom3;

  private bathroom1: Bathroom1;

  private bathroom2: Bathroom2;

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
    super(canvas, './assets/img/easyHallway.png');
    console.log('creating easy hallway');

    // sets the classrooms to not interacted
    this.room1Interact = false;
    this.room2Interact = false;
    this.room3Interact = false;
    this.bathroomInteractBoy = false;
    this.bathroomInteractGirl = false;

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

    // creating collectibles
    this.collectibles.push(
      new Hint(this.canvas.width / 3, this.canvas.height / 3)
    );

    // creates npcs with their dialogs for this room
    this.npcs.push(
      new Npc('./assets/img/student-1-back-faced.png', 575, 495, [
        new Dialog(
          'Hello, I lost my backpack....#',
          ['really?', 'oh no'],
          ['yes..', 'all my things are there']
        ),
        new Dialog(
          'Can you please look for it and bring it back to me tomorrow?#',
          ['Sure!', 'okay'],
          ['', '']
        ),
      ]),
      new Npc('./assets/img/student-black-haired-left-faced.png', 195, 315, [
        new Dialog(
          'There are some things you should never share!#',
          ['I know that', 'ok..'],
          ['Good!', 'I am scared']
        ),
        new Dialog(
          'I hope she will not be bullied#',
          ['Me too!', '...'],
          ['', '']
        ),
      ]),
      new Npc('./assets/img/student-red-right-faced.png', 155, 315, [
        new Dialog(
          'Did you hear about Jessica?#',
          ['No..', 'What happaned?'],
          ['How not?', 'The picture!']
        ),
        new Dialog(
          'Cant believe she shared that picture :O#',
          ['Didnt see it', '...'],
          ['', '']
        ),
      ])
    );

    // creats the doors in the hallway
    this.doors.push(new Door('./assets/img/door1.png', 632, 228.5));
    this.doors.push(new Door('./assets/img/door1.png', 450, 228.5));
    this.doors.push(new Door('./assets/img/door1.png', 280, 228.5));

    this.doors.push(
      new Door('./assets/img/girl-bathroom-door.png', 910, 228.5),
    );
    this.doors.push(new Door('./assets/img/boy-bathroom-door.png', 100, 228.5));

<<<<<<< HEAD
    this.insertHitbox(49, 245, 1000, 10, 1);
    this.insertHitbox(144, 548.5, 1000, 10, 1);
    this.insertHitbox(957, 304, 50, 10, 1);
    this.insertHitbox(65, 308.5, 30, 300, 1);
    this.insertHitbox(959, 451.5, 50, 40, 1);
    this.insertHitbox(144, 490.5, 97, 10, 1);
    this.insertHitbox(383, 490.5, 145.5, 10, 1);
    this.insertHitbox(669, 490.5, 194, 10, 1);
    this.insertHitbox(813, 307.5, 97, 10, 1);
    this.insertHitbox(390, 314.5, 30, 30, 1);
    this.insertHitbox(772, 314.5, 30, 30, 1);
=======
    this.insertHitbox(10, 10, 10, 10, 1);
>>>>>>> b6ad603b955bfafe61db3d37233eab51ed4efb43
  }

  /**
   * Updates the esay hallway
   *
   * @param elapsed of the gameloop
   * @returns the mainhallway
   */
  // eslint-disable-next-line class-methods-use-this
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    // calling general checkups from Room class
    const nextScene: Scene = this.generalInteraction();
    const cNum: number = this.player.getCharacterNum();

    // LEAVES EASY HALLWAY
    if (this.player.getXPos() >= 969 && this.player.getYPos() >= 309.5) {
      this.player.setXPos(163);
      this.player.setYPos(440);
      // setting image of player according to the right character chosen
      if (cNum === 1) {
        this.player.setImage('./assets/img/player-boy1-right.png');
      } else if (cNum === 2) {
        this.player.setImage('./assets/img/player-boy2-right.png');
      } else if (cNum === 3) {
        this.player.setImage('./assets/img/player-girl2-right.png');
      } else if (cNum === 4) {
        this.player.setImage('./assets/img/player-girl1-right.png');
      }
      console.log('main halwway return');
      return this.mainHallway;
    }

    // INTERACTIONS
    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          // setting player starter position and image in the classrooms
          this.player.setXPos(911);
          this.player.setYPos(473);
          // setting image of player according to the right character chosen
          if (cNum === 1) {
            this.player.setImage('./assets/img/player-boy1-down.png');
          } else if (cNum === 2) {
            this.player.setImage('./assets/img/player-boy2-down.png');
          } else if (cNum === 3) {
            this.player.setImage('./assets/img/player-girl2-down.png');
          } else if (cNum === 4) {
            this.player.setImage('./assets/img/player-girl1-down.png');
          }
          this.doorOpen.play();
          if (i === 0) {
            // if this classroom was previously entered to
            if (this.room1Interact === false) {
              this.class1 = new ClassRoom1(
                this.canvas,
                this,
                this.player,
                this.isMenuShowing
              );
              this.room1Interact = true;
            }
            return this.class1;
          }
          // checking which door
          if (i === 1) {
            // if this classroom was previously entered to
            if (this.room2Interact === false) {
              this.class2 = new ClassRoom2(
                this.canvas,
                this,
                this.player,
                this.isMenuShowing
              );
              this.room2Interact = true;
            }

            return this.class2;
          }
          // checking which door
          if (i === 2) {
            // if this classroom was previously entered to
            if (this.room3Interact === false) {
              this.class3 = new ClassRoom3(
                this.canvas,
                this,
                this.player,
                this.isMenuShowing
              );
              this.room3Interact = true;
            }
            return this.class3;
          }
          // checking which door
          if (i === 3) {
            // setting player starter position and image in the classrooms
            this.player.setXPos(911);
            this.player.setYPos(350);
            // if this classroom was previously entered to
            if (this.bathroomInteractGirl === false) {
              this.bathroom1 = new Bathroom1(
                this.canvas,
                this,
                this.player,
                this.isMenuShowing
              );
              this.bathroomInteractGirl = true;
            }
            return this.bathroom1;
          }
          // checking which door
          if (i === 4) {
            // setting player starter position and image in the classrooms
            this.player.setXPos(911);
            this.player.setYPos(350);
            // if this classroom was previously entered to
            if (this.bathroomInteractBoy === false) {
              this.bathroom2 = new Bathroom2(
                this.canvas,
                this,
                this.player,
                this.isMenuShowing
              );
              this.bathroomInteractBoy = true;
            }
            return this.bathroom2;
          }
        }
      }
    }
    // according to the general checks in room
    if (nextScene !== null) {
      return nextScene;
    }
    return null;
  }

  /**
   * Renders the easy hallway
   */
  public render(): void {
    this.draw(this.ctx);
    super.render();
    this.drawHitBoxes();
  }

  /*
  public drawRectengles(): void {
    this.ctx.beginPath();
    this.ctx.rect(1450, 433, 50, 50);
    this.ctx.stroke();
  }
  */
}
