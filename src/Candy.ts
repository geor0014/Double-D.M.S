import Collectibles from './collectibles.js';

export default class Candy extends Collectibles {
  /**
   * Creates a new candy
   *
   * @param xPos number
   * @param yPos number
   */
  public constructor(xPos: number, yPos: number) {
    super('./assets/img/candy.png', xPos, yPos);
  }
}
