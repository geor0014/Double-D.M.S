import GameEntity from './GameEntity.js';

export default class Hint extends GameEntity {
  /**
   * Creates a new candy
   *
   * @param xPos number
   * @param yPos number
   */
  constructor(xPos: number, yPos: number) {
    super('./assets/img/hint.png', xPos, yPos);
  }
}
