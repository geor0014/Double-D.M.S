import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Hint from './Hint.js';
import Computer from './Computer.js';

import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import Npc from './Npc.js';

import Dialog from './Dialog.js';

export default class ClassRoom5 extends Room {
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
    this.computer = new Computer(266, 165.5);

    // sets the NPCs with their dialogs in the classroom
    this.npcs.push(
      new Npc('./assets/img/teacher-blonde-hair-front-faced.png', 714, 198, [
        new Dialog('Welcome to class!#'),
        new Dialog('Did you see my bag anywhere?#'),
      ]),
    );

    // creating collectibles in the classroom
    this.collectibles.push(
      new Hint(this.canvas.width / 1.5, this.canvas.height / 3),
    );

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
        ' Should you use free Anti-Virus?#',
        'No, since the anti-virus can be a virus!#',
        'No, since I know what I download!#',
        'No, since I do not want to use an anti-virus!#',
      ),
      new Question(
        this.player.getUserData(),
        'Which of the following is NOT an example of cyberbullying',
        'Inviting a friend to fight with you in a game#',
        'Creating a fake profile to humiliate someone#',
        'Posting or sharing embarrassing photos#',
      ),
      new Question(
        this.player.getUserData(),
        'What is a predator?#',
        'Someone who uses the internet to do harm to others#',
        'Someone who shares too much personal information#',
        'Someone who regularly surfs the web#',
      ),
    );

    console.log('CLASSROOM5');
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
          this.player.setXPos(493);
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
