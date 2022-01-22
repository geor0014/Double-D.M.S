import Door from './Door.js';
import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Candy from './Candy.js';

import Npc from './Npc.js';
import Dialog from './Dialog.js';

export default class Bathroom2 extends Room {
  // Room the player have previously been
  private previousScene: Scene;

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
    player: Player,
  ) {
    super(canvas, './assets/img/bathroom2.png');

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
      new Npc('./assets/img/purpleBoy.png', 652, 436, [
        new Dialog('I am escaping class#', ['ok', 'Me too'], ['I guess..', 'Yay!']),
      ]),
    );
    // creating collectibles in the classroom
    this.getCollectibles().push(
      new Candy(this.canvas.width / 2, this.canvas.height / 2),
    );

    // creating the door for the classroom
    this.getDoors().push(new Door('./assets/img/boyBathroomDoor.png', 912, 265));

    // Adds all the hitboxes to the bathroom
    this.insertHitbox(910, 435.5, 50, 70, 1);
    this.insertHitbox(956, 136.5, 10, 242, 1);
    this.insertHitbox(479, 181.5, 410, 70, 1);
    this.insertHitbox(909, 298.5, 10, 10, 1);
    this.insertHitbox(233, 535.5, 630, 10, 1);
    this.insertHitbox(432, 311.5, 45, 160, 1);
    this.insertHitbox(336, 180.5, 45, 290, 1);
    this.insertHitbox(240, 180.5, 45, 290, 1);
    this.insertHitbox(170, 179.5, 21, 370, 1);
    this.insertHitbox(188, 122, 720, 10, 1);

    // console.log('Bathroom1');
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

          this.player.setXPos(100);
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
          return this.previousScene;
        }
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
    // calls the render function of the parent aka ROOM
    super.render();
    this.drawHitBoxes();
  }
}
