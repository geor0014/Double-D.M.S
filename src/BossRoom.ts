import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Candy from './Candy.js';

import Question from './Question.js';

import Boss from './Boss.js';
import Npc from './Npc.js';
import Dialog from './Dialog.js';

export default class BossRoom extends Room {
  private previousScene: Scene;

  private questions: Question[];

  private boss: Boss;

  private bossNpc: Npc;

  private frameY = 0;

  private gameFrame = 0;

  private staggerFrame = 11;

  /**
   * creats a new classroom
   *
   * @param canvas canvas element
   * @param previousScene a scene
   * @param player a player
   */
  public constructor(
    canvas: HTMLCanvasElement,
    previousScene: Scene,
    player: Player
  ) {
    super(canvas, './assets/img/boss-room.png');
    // sets the previous scene to go back to
    this.previousScene = previousScene;

    // sets the player
    this.player = player;

    // sets the image of the boss room
    this.setXPos(0);
    this.setYPos(0);

    // resets the items in this room that can be communicated with
    this.collectibles = [];
    this.npcs = [];
    this.doors = [];
    this.questions = [];

    // creating collectibles in the classroom

    // creating the door for the classroom
    this.doors.push(new Door('./assets/img/door1.png', 677, 297));

    // setting player starter position and image in the room
    this.player.setXPos(566);
    this.player.setYPos(305);
    this.player.setImage('./assets/img/player-boy-standing.png');

    // creating questions for this classroom
    this.questions.push(
      new Question(
        this.player.getUserData(),
        'text question 1',
        'right answer 1',
        'wrong answer 1.1',
        'wrong answer 1.2'
      )
    );
    this.questions.push(
      new Question(
        this.player.getUserData(),
        'text question 2',
        'right answer 2',
        'wrong answer 2.1',
        'wrong answer 2.2'
      )
    );

    // creating a new boss
    this.boss = new Boss();

    this.bossNpc = new Npc('./assets/img/empty-boss.png', 430, 341, [
      new Dialog('Hello'),
    ]);
    this.npcs.push(this.bossNpc);
  }

  /**
   * Game cycle, basically loop that keeps the game running. It contains all
   * the logic needed to draw the individual frames.
   *
   * @param elapsed a number
   * @returns a scene or null
   */
  public update(elapsed: number): Scene {
    this.gameFrame += 1;

    // calling general checkups from Room class
    const nextScene: Scene = this.generalInteraction();

    // Checking if the player is interacting with different elements
    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          this.doorClose.play();
          console.log(this.previousScene);
          this.player.setXPos(521);
          this.player.setYPos(235);
          this.player.setImage('./assets/img/player-boy-standing.png');
          return this.previousScene;
        }
      }

      // // WITH COMPUTER
      // if (this.player.collidesWith(this.computer)) {
      //   // present question screen
      //   return new QuestionScreen(this.canvas, this, this.questions);
      // }
    }

    // BOSS RENDERING
    if (this.gameFrame % this.staggerFrame === 0) {
      if (this.frameY < 3) {
        this.frameY += 1;
      } else {
        this.frameY = 0;
      }

      // passes the frame to the Boss class
      this.boss.setFrameY(this.frameY);
    }

    // if needs to move to a difeerent scene or not
    if (nextScene !== null) {
      return nextScene;
    }
    return null;
  }

  /**
   * draws items to screen
   */
  public render(): void {
    // CLEAR CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // DRAW ROOM
    this.draw(this.ctx);
    // DRAW BOSS
    this.boss.draw(this.ctx);

    super.render();
  }
}
