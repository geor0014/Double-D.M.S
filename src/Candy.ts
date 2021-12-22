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
<<<<<<< HEAD
    this.setImageHeight(10);
    this.setImageWidth(10);
=======
    this.setImageHeight(20);
    this.setImageWidth(20);
>>>>>>> b67ee9358c538035333bdf39ce3093f31dbd1a50
  }
}
