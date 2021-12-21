import GameEntity from './GameEntity.js';

export default class Candy extends GameEntity {
  /**
   * Creates a new candy
   *
   * @param x number
   * @param y number
   */
  constructor(x: number, y: number) {
    super('./assets/img/candy.png', x, y);
    this.setImageHeight(10);
    this.setImageWidth(10);
  }
}
