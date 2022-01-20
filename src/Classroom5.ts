import Door from './Door.js';

import Scene from './Scene.js';

import Player from './Player.js';

import Hint from './Hint.js';
import Computer from './Computer.js';

import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import Npc from './Npc.js';

import Dialog from './Dialog.js';
import Classroom from './Classroom.js';

export default class ClassRoom5 extends Classroom {
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
    super(canvas, previousScene, player, state, './assets/img/classroom.png');

    // creating a new computer in the classroom
    this.setComputer(new Computer(479, 253));

    // sets the NPCs with their dialogs in the classroom
    this.npcs.push(
      new Npc('./assets/img/BlondeHairTeacherFrontFacing.png', 600, 250, [
        new Dialog(
          'You should take a break sometimes#',
          ['Yes Im tired', 'I am okay'],
          ['Studying can be hard', 'good to know!']
        ),
        new Dialog(
          'The cafeteria has great food!#',
          ['Ill check it out!', 'I am hungry..'],
          ['', '']
        ),
      ])
    );

    // creating collectibles in the classroom
    this.collectibles.push(
      new Hint(this.canvas.width / 1.5, this.canvas.height / 3)
    );

    // creating the door for the classroom
    this.doors.push(new Door('./assets/img/door1.png', 912, 400.5));

    // creating questions for this classroom
    this.setQuestions([new Question(
      this.player.getUserData(),
      ' Should you use free Anti-Virus?#',
      'No, since the anti-virus can be a virus!',
      'No, since I know what I download!',
      'No, since I do not want to use an anti-virus!',
    ), new Question(
      this.player.getUserData(),
      'Which of the following is NOT an example of cyberbullying?#',
      'Inviting a friend to fight with you in a game',
      'Creating a fake profile to humiliate someone',
      'Posting or sharing embarrassing photos',
    ), new Question(
      this.player.getUserData(),
      'What is a predator?#',
      'Someone who uses the internet to do harm to others',
      'Someone who shares too much personal information',
      'Someone who regularly surfs the web',
    )]);

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

    // console.log('CLASSROOM5');
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
          this.player.setXPos(460);
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
