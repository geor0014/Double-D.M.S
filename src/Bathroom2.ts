import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Candy from './Candy.js';

import Npc from './Npc.js';
import Dialog from './Dialog.js';

export default class Bathroom2 extends Room {
  private previousScene: Scene;

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
    state: boolean
  ) {
    super(canvas, './assets/img/bathroom2.png', state);

    // sets the previous scene to return to
    this.previousScene = previousScene;

    // sets the player
    this.player = player;

    // sets the background image position
    this.setXPos(0);
    this.setYPos(0);

    // resets the items in the room
    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    // sets the NPCs with their dialogs in the classroom

    // creating collectibles in the classroom
    this.collectibles.push(
      new Candy(this.canvas.width / 2, this.canvas.height / 2),
    );

    // creating the door for the classroom
    this.doors.push(new Door('./assets/img/boy-bathroom-door.png', 912, 265));

    this.insertHitbox(10, 10, 10, 10);

    console.log('Bathroom1');
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
          console.log('interact with door');
          this.doorClose.play();
          console.log(this.previousScene);
          this.player.setXPos(100);
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
          return this.previousScene;
        }
      }
    }
    console.log(`score is ${this.player.getUserData().getScore()}`);
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
    super.render();
    //console.log(this.player.getXPos(), this.player.getYPos());
  }
}
