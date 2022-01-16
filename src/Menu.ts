import GameEntity from './GameEntity.js';

export default class Menu extends GameEntity {
  /**
   * Creates a new Menu
   * @param xPos position X
   * @param yPos position Y
   */
  constructor(xPos: number, yPos: number) { // we can also set the x and y pos exact
    super('./assets/img/menu.png', xPos, yPos);
  }
}
