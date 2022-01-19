import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';

import Boss from './Boss.js';
import Npc from './Npc.js';
import HappyEnding from './HappyEnding.js';
import SadEnding from './SadEnding.js';

export default class BossRoom extends Room {
  private previousScene: Scene;

  private questions: Question[];

  private boss: Boss;

  private bossNpc: Npc;

  private frameY = 0;

  private gameFrame = 0;

  private staggerFrame = 11;

  private endingScreen: boolean = false;

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

    // setting player starter position and image in the room
    this.player.setXPos(529);
    this.player.setYPos(639);
    // setting image of player according to the right character chosen
    const cNum: number = this.player.getCharacterNum();
    if (cNum === 1) {
      this.player.setImage('./assets/img/player-boy1-up.png');
    } else if (cNum === 2) {
      this.player.setImage('./assets/img/player-boy2-up.png');
    } else if (cNum === 3) {
      this.player.setImage('./assets/img/player-girl2-up.png');
    } else if (cNum === 4) {
      this.player.setImage('./assets/img/player-girl1-up.png');
    }

    // creating questions for this classroom
    this.questions.push(
      new Question(
        this.player.getUserData(),
        'So you finaly made it here...#',
        'I am ready to face you!',
        'who are you again?',
        'whatever...'
      ),
      new Question(
        this.player.getUserData(),
        'I am your final challange! # before you can even dream of a phone you need to face me!# do you think you can handle this?!#',
        'Nothing will stand in my way!',
        'I can easily defeat you!',
        'whatever...'
      ),
      new Question(
        this.player.getUserData(),
        'Here are my questions!#',
        'okay man..',
        'let`s go!',
        'whatever...'
      ),
      new Question(
        this.player.getUserData(),
        'Hey kid, I can make you famous on tiktok# very fast and you can make all your friends jealous!# Send me your address and your mother`s credit card to pay!!#',
        'Ignore and delete the message',
        'OMG YES, I`ve always wanted to be famous take my money!',
        'I dont even like tik-tok'
      ),
      new Question(
        this.player.getUserData(),
        'How do you make sure that your data is secure enough?#',
        'Use a different password for different accounts',
        'Use an easy password you can use for every account',
        'Use different passwords which are too long'
      ),
      new Question(
        this.player.getUserData(),
        'Someone hacked into your account, what do you do?#',
        'Write the support to get your account back',
        'Not do anything',
        'Create new account and not use the old one'
      ),
      new Question(
        this.player.getUserData(),
        'Should you use 2-Factor authentication?#',
        'Yes, since the more safety the better!',
        'No since my password is strong enough',
        'Not always'
      ),
      new Question(
        this.player.getUserData(),
        'I`m visiting a site from a company or organization that I`ve heard #of. They want my name and phone number so I can enter a contest.# Is it OK to enter?#',
        'I should check if it is really them, and ask my parents',
        'Yeah I know this company I can trust them',
        'No I should never give out information online!'
      ),
      new Question(
        this.player.getUserData(),
        'I saw you liked my posts and videos and I think youre a cool kid!# Lets hang sometimes and ill give you # free tickets to my show! What do you do? #',
        'This is for sure fake, ignore and delete',
        'OMG I CANT BELIEVE ITS YOU! I LOVE YOU! IM COMINGGGG!',
        'I never liked you anyway..'
      )
    );

    // creating a new boss
    this.boss = new Boss();
    this.bossNpc = new Npc('./assets/img/empty-boss.png', 470, 230, []);

    this.insertHitbox(10, 10, 10, 10);
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
      // with boss
      if (this.player.collidesWith(this.bossNpc)) {
        this.endingScreen = true;
        return new QuestionScreen(this.canvas, this, this.questions);
      }
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          this.doorClose.play();
          console.log(this.previousScene);
          // setting player starter position and image for the next room
          this.player.setXPos(521);
          this.player.setYPos(235);
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
    }

    // ending screen
    if (this.endingScreen) {
      if (this.player.getUserData().getScore() > 17) {
        return new HappyEnding(this.canvas, this.player.getCharacterNum());
      }
      return new SadEnding(this.canvas, this.player.getCharacterNum());
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
