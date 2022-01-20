import Door from './Door.js';

import Scene from './Scene.js';
import Player from './Player.js';

import Computer from './Computer.js';

import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import Classroom from './Classroom.js';

export default class ClassRoom3 extends Classroom {
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
    super(canvas, previousScene, player, state, './assets/img/library.png');

    // creating a new computer in the classroom
    this.setComputer(new Computer(495, 455));

    // creating the door for the classroom
    this.doors.push(new Door('./assets/img/door1.png', 912, 390));

    // setting player starter position and image in the classroom

    // creating questions for this classroom
    this.setQuestions([new Question(
      this.player.getUserData(),
      'You see the following post:#“Hey look at Timmy`s head, man he looks horrible! #Share this video or we will stop talking to you!” What will you do? ',
      'Report it and help poor Timmy',
      'Share it I don`t want to be alone',
      'Ignore and let it happen ',
    ), new Question(
      this.player.getUserData(),
      'My parents and I have established rules as to what I can do #on the Internet when Im home, but Im at a friend`s house. #Should I go by my parents rules or do whatever my friend does?',
      'Go by your parents rules',
      'Do whatever your friend does ',
      'It doesn`t really matter',
    )]);

    // Adds all the hitboxes to the bathroom
    this.insertHitbox(143, 78.5, 715, 160, 1);
    this.insertHitbox(864, 13.5, 100, 10, 1);
    this.insertHitbox(909, 77.5, 45, 250, 1);
    this.insertHitbox(956, 382.5, 10, 140, 1);
    this.insertHitbox(908, 578.5, 45, 100, 1);
    this.insertHitbox(160, 296.5, 45, 300, 1);
    this.insertHitbox(667, 330.5, 185, 150, 1);
    this.insertHitbox(669, 532.5, 185, 150, 1);
    this.insertHitbox(244, 330, 185, 150, 1);
    this.insertHitbox(475, 455.5, 100, 30, 1);
    this.insertHitbox(242, 524.5, 185, 150, 1);
    this.insertHitbox(152, 720.5, 700, 10, 1);

    // console.log('CLASSROOM3');
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
          this.player.setXPos(280);
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
