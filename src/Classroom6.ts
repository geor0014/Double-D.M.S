import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Candy from './Candy.js';
import Computer from './Computer.js';

import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';

export default class ClassRoom6 extends Room {
  // Room the player have previously been
  private previousScene: Scene;

  // computer ther player interacts with to asnwer the questions
  private computer: Computer;

  // questions which are displayed on the computer
  private questions: Question[];

  // interaction for the computer
  private pcInteract: boolean = false;

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
    super(canvas, './assets/img/artclass.png', state);
    this.previousScene = previousScene;

    this.player = player;

    this.setXPos(0);
    this.setYPos(0);

    this.collectibles = [];
    this.npcs = [];
    this.doors = [];
    this.questions = [];
    this.computer = new Computer(480, 282);

    // creating collectibles in the classroom
    this.collectibles.push(
      new Candy(this.canvas.width / 4, this.canvas.height / 4),
    );

    // creating the door for the classroom
    this.doors.push(new Door('./assets/img/door1.png', 912, 400.5));

    // creating questions for this classroom
    this.questions.push(
      new Question(
        this.player.getUserData(),
        'You are about to join this amazing new website# all your friends are there.# What information is OK to give online?#',
        'Nickname',
        'Phone number',
        'Adress',
      ),
      new Question(
        this.player.getUserData(),
        'You are having trouble doing an activity on a safe site you use at #school. Your friend offers to help but needs your password.# Would you give your password to them.',
        'No',
        'It depends',
        'Yes',
      ),
      new Question(
        this.player.getUserData(),
        'Your parents want to know what you have been doing on a safe site #you use at school. #Would you let them use your account?',
        'You would let them have a look but while youre there',
        'Yes, they are my parents I trust them',
        'No way, this site is only for kids and teachers',
      ),
    );

    // Adds all the hitboxes to the bathroom
    this.insertHitbox(911, 590, 50, 5, 1);
    this.insertHitbox(909, 640, 10, 10, 1);
    this.insertHitbox(147, 700, 750, 5, 1);
    this.insertHitbox(194, 147, 5, 500, 1);
    this.insertHitbox(245, 244, 620, 5, 1);
    this.insertHitbox(908, 165, 5, 205, 1);
    this.insertHitbox(953, 359, 5, 180, 1);
    this.insertHitbox(905, 410, 20, 5, 1);
    this.insertHitbox(242, 119, 620, 5, 1);
    this.insertHitbox(434, 363, 35, 240, 1);
    this.insertHitbox(626, 363, 35, 240, 1);
    this.insertHitbox(237, 358, 140, 140, 1);

    // console.log('door6');
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

    // INTERACTIONS
    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          // console.log('interact with door');
          this.doorClose.play();
          // console.log(this.previousScene);
          this.player.setXPos(650);
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

      // WITH COMPUTER
      if (this.player.collidesWith(this.computer)) {
        if (this.pcInteract === false) {
          // present question screen
          this.pcInteract = true;
          return new QuestionScreen(this.canvas, this, this.questions);
        }
        // console.log('cant use the pc at the moment');
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
    this.drawHitBoxes();

    this.computer.draw(this.ctx);
    // calls the render function of the parent aka ROOM
    super.render();
  }
}
