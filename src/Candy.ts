import GameEntity from './GameEntity.js';

export default class Candy extends GameEntity {
  /**
   * Creates a new candy
   *
   * @param xPos number
   * @param yPos number
   */
  constructor(xPos: number, yPos: number) {
    super('./assets/img/candy.png', xPos, yPos);
    this.setImageHeight(10);
    this.setImageWidth(10);
  }
}
