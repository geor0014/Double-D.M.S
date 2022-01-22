import Door from './Door.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Candy from './Candy.js';
import Computer from './Computer.js';

import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import Classroom from './Classroom.js';

export default class ClassRoom6 extends Classroom {
  private ambiance: HTMLAudioElement;

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
    super(canvas, previousScene, player, state, './assets/img/artclass.png');

    this.ambiance = new Audio();
    this.ambiance.src = './assets/sound/pianoRoom.mp3';
    this.ambiance.volume = 0.1;
    setTimeout(() => this.ambiance.play(), 1000);
    // creating a new computer in the classroom
    this.setComputer(new Computer(480, 282));

    // creating collectibles in the classroom
    this.getCollectibles().push(
      new Candy(this.canvas.width / 4, this.canvas.height / 4),
    );

    // creating the door for the classroom
    this.getDoors().push(new Door('./assets/img/door1.png', 912, 400.5));

    // creating questions for this classroom
    this.setQuestions([
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
    ]);

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
      for (let i = 0; i < this.getDoors().length; i += 1) {
        if (this.player.collidesWith(this.getDoors()[i])) {
          // console.log('interact with door');
          this.getDoorClose().play();
          // console.log(this.previousScene);
          this.player.setXPos(650);
          this.player.setYPos(300);

          // setting image of player according to the right character chosen
          const cNum: number = this.player.getCharacterNum();
          if (cNum === 1) {
            this.player.setImage('./assets/img/PlayerBoy1Down.png');
          } else if (cNum === 2) {
            this.player.setImage('./assets/img/playerBoy2Down.png');
          } else if (cNum === 3) {
            this.player.setImage('./assets/img/playerGirl2Down.png');
          } else if (cNum === 4) {
            this.player.setImage('./assets/img/playerGirl1Down.png');
          }

          this.ambiance.pause();
          return this.getPreviousScene();
        }
      }

      // WITH COMPUTER
      if (this.player.collidesWith(this.getComputer())) {
        if (this.getPcInteract() === false) {
          // present question screen
          this.setPcInteract(true);
          return new QuestionScreen(this.canvas, this, this.getQuestions());
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
}
