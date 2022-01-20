import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Candy from './Candy.js';

import Npc from './Npc.js';
import Dialog from './Dialog.js';
import ShadyDialog from './ShadyDialog.js';

export default class Bathroom1 extends Room {
  // Room the player have previously been
  private previousScene: Scene;

  // NPC called Shady Guy
  private shadyGuy: Npc;

  // Boolean to interact with Shady Guy
  private interactShady: boolean;

  // attribute for the audio of shady guy
  private shadyGuyTheme: HTMLAudioElement;

  /**
   * creats a new classroom
   *
   * @param canvas canvas element
   * @param previousScene a scene
   * @param player a player
   * @param state a way of hiding and unhidding the menu bar
   */
  public constructor(
    canvas: HTMLCanvasElement,
    previousScene: Scene,
    player: Player,
    state: boolean,
  ) {
    super(canvas, './assets/img/bathroom1.png', state);

    // sets the previous scene to return to
    this.previousScene = previousScene;

    // sets the player
    this.player = player;

    // sets the background image position
    this.setXPos(0);
    this.setYPos(0);

    // reseting the interaction
    this.interactShady = false;

    // resets the items in the room
    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    // sets the NPCs with their dialogs in the classroom
    this.shadyGuy = new Npc(
      './assets/img/ShadyGuySide.png',
      this.canvas.width / 2,
      400,
      [
        new Dialog(
          'Hey kid..#',
          ['What are you doing in the bathroom?', 'Hello??'],
          ['He..He..', 'You are braver than most..'],
        ),
        new Dialog(
          'I heard its your birthday today..#',
          ['It is!', 'How did you know this?'],
          ['Happy Birthday...', 'I know EVERYTHING!'],
        ),
        new Dialog(
          'I can give you some candy if you want#',
          ['Yay candy!', 'I dont want anything from you!'],
          ['hahaha', 'Why not I am pretty nice'],
        ),
        new Dialog(
          'OR I can give you a PHONE!!#',
          ['Really?!', 'I shouldnt be talking to you'],
          ['Yes!', 'Come on I know you want the phone!'],
        ),
        new Dialog(
          'What do you chose?#',
          ['The phone', 'Nothing..'],
          ['Here you go... Ill call you', 'Fine whatever..'],
        ),
      ],
    );

    // creating collectibles in the classroom
    this.collectibles.push(
      new Candy(this.canvas.width / 2, this.canvas.height / 2),
    );

    // creating the door for the classroom
    this.doors.push(new Door('./assets/img/girl-bathroom-door.png', 912, 265));

    // Adds all the hitboxes to the bathroom
    this.insertHitbox(910, 435.5, 50, 70, 1);
    this.insertHitbox(956, 136.5, 10, 242, 1);
    this.insertHitbox(479, 181.5, 410, 70, 1);
    this.insertHitbox(909, 298.5, 10, 10, 1);
    this.insertHitbox(233, 535.5, 630, 10, 1);
    this.insertHitbox(432, 311.5, 45, 160, 1);
    this.insertHitbox(336, 180.5, 45, 290, 1);
    this.insertHitbox(240, 180.5, 45, 290, 1);
    this.insertHitbox(170, 179.5, 21, 370, 1);
    this.insertHitbox(188, 122, 720, 10, 1);

    // sets the music for shady guy
    this.shadyGuyTheme = new Audio('./assets/sound/shady.wav');
    this.shadyGuyTheme.volume = 0.2;
    setTimeout(() => this.shadyGuyTheme.play(), 100);

    // console.log('Bathroom1');
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
    // calling general checkups from Room class
    const nextScene: Scene = this.generalInteraction();

    // Checking if the player is interacting with items
    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          // console.log('interact with door');

          this.doorClose.play();
          // console.log(this.previousScene);

          this.player.setXPos(910);
          this.player.setYPos(300);

          // setting image of player according to the right character chosen
          const cNum: number = this.player.getCharacterNum();
          if (cNum === 1) {
            this.player.setImage('./assets/img/player-boy1-down.png');
          } else if (cNum === 2) {
            this.player.setImage('./assets/img/player-boy2-down.png');
          } else if (cNum === 3) {
            this.player.setImage('./assets/img/player-girl2-down.png');
          } else if (cNum === 4) {
            this.player.setImage('./assets/img/player-girl1-down.png');
          }
          this.shadyGuyTheme.pause();
          return this.previousScene;
        }
      }

      // With Shady Guy
      if (
        this.player.collidesWith(this.shadyGuy)
        && this.interactShady === false
      ) {
        this.interactShady = true;
        return new ShadyDialog(
          this.canvas,
          this,
          this.shadyGuy.getDialogs(),
          this.player.getCharacterNum(),
        );
      }
    }
    // according to the general checks in room
    if (nextScene !== null) {
      return nextScene;
    }
    return null;
  }

  /**
   * draws items to screen
   */
  public render(): void {
    this.draw(this.ctx);
    this.shadyGuy.draw(this.ctx);

    // calls the render function of the parent aka ROOM
    super.render();

    this.drawHitBoxes();

    // console.log(this.player.getXPos(), this.player.getYPos());
  }
}
