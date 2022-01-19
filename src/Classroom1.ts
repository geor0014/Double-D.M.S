import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Candy from './Candy.js';
import Computer from './Computer.js';

import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';

import Npc from './Npc.js';
import Dialog from './Dialog.js';

export default class ClassRoom1 extends Room {
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
    super(canvas, './assets/img/classroom.png', state);

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
    this.questions = [];

    // creating a new computer in the classroom
    this.computer = new Computer(479, 253);

    // sets the NPCs with their dialogs in the classroom
    this.npcs.push(
      new Npc('./assets/img/student-orange-hair-back-faced.png', 652, 436, [
        new Dialog('Hey, listen...have you seen a doll?#', ['No..', 'You play with dolls?'], ['Oh...', 'not nice!']),
        new Dialog('My little sister lost hers and I am trying to find it.#', ['oh..', 'I can help you find it'], ['I am sad for her', 'Thank you!']),
        new Dialog('If you see it, bring it to me tomorrow, okay?#', ['ok!', 'will do!'], ['Great!', 'Thanks']),
        new Dialog('Class is over, gotta go now. See you tomorrow!#', ['Bye Bye', 'Take care!'], ['', '']),
      ]),
      new Npc('./assets/img/teacher-blonde-hair-front-faced.png', 714, 298, [
        new Dialog('Today we are learning about suspicious links and strangers messeges#', ['ok', 'umm..okay?'], [':)', '^__^']),
        new Dialog('This is very important!#', ['I guess..', 'Sure is!'], ['', '']),
      ]),
    );
    // creating collectibles in the classroom
    this.collectibles.push(
      new Candy(this.canvas.width / 2, this.canvas.height / 2),
    );

    // creating the door for the classroom
    this.doors.push(new Door('./assets/img/door1.png', 912, 400.5));

    // creating questions for this classroom
    this.questions.push(
      new Question(
        this.player.getUserData(),
        'Congratulations you just won a giveaway!# a Nigerian Prince chose you to be the winner!!#Send him your bank account details and your ID to get 500.000€!!',
        'Not pay attention and delete this email/message',
        'Send an E-mail to make sure it is real',
        'YES, TAKE ALL MY DATA!',
      ),
    );
    this.questions.push(
      new Question(
        this.player.getUserData(),
        'Someone sent you a link to a YouTube video,# you click on it and suddenly you have a virus on your pc!# What could u have done differently? ',
        'Not click on the link',
        'Send this cool link to all my friends!',
        'start chatting with this person for fun',
      ),
    );

    // Adds all the hitboxes to the bathroom
    this.insertHitbox(911, 563, 50, 5, 1);
    this.insertHitbox(909, 600, 10, 10, 1);
    this.insertHitbox(147, 658, 750, 5, 1);
    this.insertHitbox(194, 107, 5, 500, 1);
    this.insertHitbox(245, 107, 650, 5, 1);
    this.insertHitbox(908, 165, 5, 205, 1);
    this.insertHitbox(953, 359, 5, 150, 1);
    this.insertHitbox(905, 410, 20, 5, 1);
    this.insertHitbox(242, 169, 620, 5, 1);
    this.insertHitbox(286, 313, 35, 270, 1);
    this.insertHitbox(386, 313, 35, 270, 1);
    this.insertHitbox(674, 313, 35, 270, 1);
    this.insertHitbox(774, 313, 35, 270, 1);

    // console.log('CLASSROOM1');
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
          this.player.setXPos(632);
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
    // console.log(`score is ${this.player.getUserData().getScore()}`);
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
    this.computer.draw(this.ctx);
    // calls the render function of the parent aka ROOM
    super.render();
    this.drawHitBoxes();
    console.log(this.player.getXPos(), this.player.getYPos());
  }
}
