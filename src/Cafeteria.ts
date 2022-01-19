import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Candy from './Candy.js';

import Npc from './Npc.js';
import Dialog from './Dialog.js';

export default class Cafeteria extends Room {
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
    super(canvas, './assets/img/diningroom.png', state);

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
    this.npcs.push(
      new Npc('./assets/img/student-orange-hair-back-faced.png', 652, 436, [
        new Dialog('Hello, this is some delicious food they have here#', ['' , ''], ['', '']),
        new Dialog('I love french fries, how about you?#', ['' , ''], ['', '']),
      ]),
      new Npc('./assets/img/teacher-blonde-hair-front-faced.png', 714, 298, [
        new Dialog('Hurry up, everyone, class starts in 10 minutes!!#', ['' , ''], ['', '']),
      ]),
      new Npc('./assets/img/lunch-lady.png', 300, 500, [
        new Dialog('Good day!# we have some special treats today!#', ['ohh delicious', 'I am starving'], ['I hope so I worked hard on this', 'You should eat something']),
        new Dialog('I can trade you some candy for hints#', ['Yes please', 'No thank you'], ['There you go', 'Okay maybe later']),
      ]),
    );
    // creating collectibles in the classroom
    this.collectibles.push(
      new Candy(this.canvas.width / 2, this.canvas.height / 2)
    );

    this.doors.push(new Door('./assets/img/cafeteria-door.png', 907, 362));

    // creating the door for the classroom
    this.insertHitbox(955, 356.5, 10, 160, 1);
    this.insertHitbox(906, 563.5, 45, 100, 1);
    this.insertHitbox(428, 105.5, 600, 115, 1);
    this.insertHitbox(864, 274.5, 100, 30, 1);
    this.insertHitbox(139, 264.5, 330, 100, 1);
    this.insertHitbox(190, 413.5, 240, 100, 1);
    this.insertHitbox(164, 559.5, 30, 100, 1);
    this.insertHitbox(240, 660.5, 630, 10, 1);
    this.insertHitbox(243, 604.5, 140, 10, 1);
    this.insertHitbox(528, 513.5, 280, 100, 1);
    this.insertHitbox(522, 365.5, 290, 100, 1);
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
          this.player.setXPos(291);
          this.player.setYPos(361);
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
    this.drawHitBoxes();
    //console.log(this.player.getXPos(), this.player.getYPos());
  }
}
