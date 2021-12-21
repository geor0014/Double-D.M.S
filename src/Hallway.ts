import Player from './Player.js';
import Room from './Room.js';

export default class Hallway extends Room {
  /**
   * creats a new hallway
   *
   * @param canvas canvas element
   * @param player a player
   */
  public constructor(canvas: HTMLCanvasElement, player: Player) {
    super(canvas, './assets/img/hallway.png', player);
    this.xPos = canvas.width / 4;
    this.yPos = 0;
    this.imageHeight = canvas.height;
    this.imageWidth = canvas.width / 2;

    console.log('hi');
  }
}
