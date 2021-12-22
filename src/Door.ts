import GameEntity from './GameEntity.js';

export default class Door extends GameEntity {
  /**
   * Creates a new candy
   *
   * @param srcImage a string
   * @param xPos number
   * @param yPos number
   */
  constructor(srcImage:string, xPos: number, yPos: number) {
    super(srcImage, xPos, yPos);
    this.setImageHeight(this.getImage().height + 40);
    this.setImageWidth(this.getImage().width + 15);
  }
}
