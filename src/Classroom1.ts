import Room from './Room.js';

export default class ClassRoom1 extends Room {
  /**
   * creats a new classroom
   *
   * @param canvas canvas element
   * @param player a player
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas, './assets/img/classroom.png');
    this.setXPos(canvas.width / 4);
    this.setYPos(0);
    this.setImgHeight(canvas.height);
    this.setImgWidth(canvas.width / 2);

    console.log('hi');
  }
}
