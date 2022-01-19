import GameEntity from './GameEntity.js';

export default class Computer extends GameEntity {
  /**
   * Creates a new computer
   *
   * @param xPos number
   * @param yPos number
   */
  public constructor(xPos: number, yPos: number) {
    super('./assets/img/computer.png', xPos, yPos);
  }
}
