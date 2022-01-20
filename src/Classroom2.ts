import Door from './Door.js';

import Scene from './Scene.js';
import Player from './Player.js';

import Hint from './Hint.js';
import Computer from './Computer.js';

import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';
import QuestItem from './QuestItem.js';
import Classroom from './Classroom.js';

export default class ClassRoom2 extends Classroom {
  // teddy which is being used for the quest of the guy with black hair located in the easy hallway
  private teddy: QuestItem = new QuestItem(
    'teddy',
    './assets/img/teddy.png',
    263,
    480,
  );

  private pushOnce: boolean = true;

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
    super(canvas, previousScene, player, state, './assets/img/scienceClass.png');

    // creating a new computer in the classroom
    this.setComputer(new Computer(476, 247));

    // creating collectibles in the classroom
    this.getCollectibles().push(
      new Hint(this.canvas.width / 2 - 100, this.canvas.height / 2 - 70),
    );

    // creating the door for the classroom
    this.getDoors().push(new Door('./assets/img/door1.png', 912, 400.5));

    // setting player starter position and image in the classroom

    // creating questions for this classroom
    this.setQuestions([new Question(
      this.player.getUserData(),
      'You are creating an account on your favorite social media.# Before you can access it,#they ask you to accept the general terms of condition!# What do you do?',
      'Ask your parents what they think',
      'Not read it and accept it',
      'Read through everything and decide if you accept',
    ), new Question(
      this.player.getUserData(),
      'Which of these files are safe to download?#',
      'Game.exe',
      'Virus.exe ',
      'Trojan.exe',
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
    this.insertHitbox(380, 370, 35, 240, 1);
    this.insertHitbox(536, 370, 35, 240, 1);
    this.insertHitbox(674, 370, 35, 240, 1);

    // console.log('CLASSROOM2');
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
      for (let i = 0; i < this.getDoors().length; i += 1) {
        if (this.player.collidesWith(this.getDoors()[i])) {
          // console.log('interact with door');
          this.getDoorClose().play();
          // console.log(this.previousScene);

          this.player.setXPos(450);
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
    this.addQuestItems();

    // according to the general checks in room
    if (nextScene !== null) {
      return nextScene;
    }
    return null;
  }

  /**
   * Adds the ques items to the array
   */
  private addQuestItems(): void {
    // CREATES BACKPACK
    if (this.pushOnce === true) {
      this.player
        .getUserData()
        .getQuests()
        .forEach((quest) => {
          if (quest === 'Look for Teddy') {
            this.player.getUserData().getQuestItems().push(this.teddy);
            this.pushOnce = false;
          }
        });
    }
  }

  /**
   * draws items to screen
   */
  public render(): void {
    super.render();
    // DRAWS QUESTITEMS
    this.player
      .getUserData()
      .getQuestItems()
      .forEach((item) => {
        if (item.getName() === 'teddy') item.draw(this.ctx);
      });
  }
}
