import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Candy from './Candy.js';

import Npc from './Npc.js';
import Dialog from './Dialog.js';
import HintBuyDialog from './HintBuyDialog.js';

export default class Cafeteria extends Room {
  // Room the player have previously been
  private previousScene: Scene;

  // NPC for the lunchlady
  private lunchLady: Npc;

  // set frames
  private staggerFrame = 8;

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
    super(canvas, './assets/img/diningroom.png', state);

    // sets the previous scene to return to
    this.previousScene = previousScene;

    // sets the player
    this.player = player;

    // sets the background image position
    this.setXPos(0);
    this.setYPos(0);

    // resets the items in the room
    this.setCollectibles([]);
    this.setNpcs([]);
    this.setDoors([]);

    // sets the NPCs with their dialogs in the classroom
    this.getNpcs().push(
      new Npc('./assets/img/gingerGirl.png', 652, 436, [
        new Dialog(
          'This is some delicious food they have here#',
          ['I know right!', 'I guess..'],
          ['I am excited for today', 'Happy bithday btw!']
        ),
        new Dialog(
          'I love french fries, how about you?#',
          ['Meh..', 'LOVE THEM'],
          ['oh shame..', 'I KNOW THEY ARE THE BEST']
        ),
      ]),
      new Npc('./assets/img/greenGirl.png', 714, 298, [
        new Dialog(
          'Hurry up, everyone, class starts in 10 minutes!!#',
          ['Dont feel like it..', 'Better go!'],
          ['', '']
        ),
      ])
    );

    this.lunchLady = new Npc(
      './assets/img/lunchLady.png',
      300,
      500,
      [
        new Dialog(
          'Good day!# we have some special treats today!#',
          ['ohh delicious', 'I am starving'],
          ['I hope so, I worked hard on this', 'You should eat something']
        ),
        new Dialog(
          'I can trade you some candy for hints#',
          ['Yes please', 'No thank you'],
          ['There you go', 'Okay maybe later']
        ),
      ],
      true
    );

    // creating collectibles in the classroom
    this.getCollectibles().push(
      new Candy(this.canvas.width / 2, this.canvas.height / 3)
    );

    this.getDoors().push(new Door('./assets/img/cafeteriaDoor.png', 907, 362));

    // Adds all the hitboxes to the bathroom
    this.insertHitbox(955, 356.5, 10, 160, 1);
    this.insertHitbox(906, 563.5, 45, 100, 1);
    this.insertHitbox(428, 105.5, 600, 115, 1);
    this.insertHitbox(864, 274.5, 100, 30, 1);
    this.insertHitbox(139, 264.5, 330, 100, 1);
    this.insertHitbox(190, 413.5, 240, 100, 1);
    this.insertHitbox(164, 559.5, 30, 100, 1);
    this.insertHitbox(240, 660.5, 630, 10, 1);
    this.insertHitbox(243, 604.5, 140, 10, 1);
    this.insertHitbox(528, 513.5, 280, 100, 1);
    this.insertHitbox(522, 365.5, 290, 100, 1);
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

    // renders stars
    this.renderStars();

    // Checking if the player is interacting with items
    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.getDoors().length; i += 1) {
        if (this.player.collidesWith(this.getDoors()[i])) {
          // console.log('interact with door');
          this.getDoorClose().play();
          // console.log(this.previousScene);

          this.player.setXPos(284);
          this.player.setYPos(250);
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
          return this.previousScene;
        }
      }

      // Lunch Lady
      if (this.player.collidesWith(this.lunchLady)) {
        return new HintBuyDialog(
          this.canvas,
          this,
          this.lunchLady.getDialogs(),
          this.player.getUserData()
        );
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
    this.lunchLady.draw(this.ctx);

    // calls the render function of the parent aka ROOM
    super.render();
    this.drawHitBoxes();
  }

  private renderStars(): void {
    // STAR RENDERING
    this.setGameFrame(this.getGameFrame() + 1);
    if (this.getGameFrame() % this.staggerFrame === 0) {
      if (this.getFrameX() < 9) {
        this.setFrameX(this.getFrameX() + 1);
      } else {
        this.setFrameX(0);
      }
    }
    // passes the frame to the NPC class
    this.lunchLady.setFrameX(this.getFrameX());
  }
}
