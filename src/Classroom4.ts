import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Candy from './Candy.js';
import Computer from './Computer.js';

import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';

export default class ClassRoom4 extends Room {
  private previousScene: Scene;

  private computer: Computer;

  private questions: Question[];

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
    state: boolean
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
    this.computer = new Computer(266, 165.5);

    // creating collectibles in the classroom

    // creating the door for the classroom
    this.doors.push(new Door('./assets/img/door1.png', 985, 485));

    // setting player starter position and image in the classroom
    this.player.setXPos(990);
    this.player.setYPos(548);
    this.player.setImage('./assets/img/player-boy-standing.png');

    // creating questions for this classroom
    this.questions.push(
      new Question(
        this.player.getUserData(),
        'I met someone in a chat room who wants to get together. #They live nearby. Should I go?',
        'I should ask my parent about this and decide with them',
        'Yes, it is always nice to have a new friend!',
        'Talking to people online is wrong!',
      ),
      new Question(
        this.player.getUserData(),
        'Hey man! I just lost my account data for my Fortnite account# Do you think you could send me your password and username# so I can play with yours because all my skins are gone :((',
        'Report that person',
        'Send them wrong data',
        'Send password and username since you feel bad for them',
      ),
      new Question(
        this.player.getUserData(),
        'You need to create a password for a website.# What should you use?#',
        'A random word, number, and symbols (e.g. 1cecr3am!)',
        'A nickname (e.g jumpingjacks)',
        'Your name and the year you were born (e.g. jack2011)',
      )
    );

    console.log('CLASSROOM4');
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
          this.player.setXPos(343);
          this.player.setYPos(350);
          this.player.setImage('./assets/img/player-boy-standing.png');
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
        console.log('cant use the pc at the moment');
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
    this.computer.draw(this.ctx);
    super.render();
  }
}
