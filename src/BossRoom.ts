import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Candy from './Candy.js';
import Computer from './Computer.js';

import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';

import HintScreen from './HintScreen.js';
import Boss from './Boss.js';

export default class BossRoom extends Room {
  private previousScene: Scene;

  private computer: Computer;

  private questions: Question[];

  private boss: Boss;

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
    player: Player,
  ) {
    super(canvas, './assets/img/boss-room.png');
    this.previousScene = previousScene;

    this.player = player;

    this.setXPos(0);
    this.setYPos(0);

    this.collectibles = [];
    this.npcs = [];
    this.doors = [];
    this.questions = [];
    this.computer = new Computer(618, 113);

    // creating collectibles in the classroom
    this.collectibles.push(
      new Candy(this.canvas.width / 2, this.canvas.height / 2),
    );

    // creating the door for the classroom
    this.doors.push(new Door('./assets/img/door1.png', 864, 300));

    // setting player starter position and image in the classroom
    this.player.setXPos(861);
    this.player.setYPos(365);
    this.player.setImage('./assets/img/player-boy-standing.png');

    // creating questions for this classroom
    this.questions.push(
      new Question(
        this.player.getUserData(),
        'text question 1',
        'right answer 1',
        'wrong answer 1.1',
        'wrong answer 1.2',
      ),
    );
    this.questions.push(
      new Question(
        this.player.getUserData(),
        'text question 2',
        'right answer 2',
        'wrong answer 2.1',
        'wrong answer 2.2',
      ),
    );

    this.boss = new Boss();
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
    this.generalInteraction();

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
          this.doorClose.play();
          console.log(this.previousScene);
          this.player.setXPos(732);
          this.player.setYPos(200);
          this.player.setImage('./assets/img/player-boy-standing.png');
          return this.previousScene;
        }
      }

      // WITH COMPUTER
      if (this.player.collidesWith(this.computer)) {
        // present question screen
        return new QuestionScreen(this.canvas, this, this.questions);
      }
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
    // DRAW COMPUTER
    this.computer.draw(this.ctx);

    super.render();
  }
}
