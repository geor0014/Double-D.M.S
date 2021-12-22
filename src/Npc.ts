import GameEntity from './GameEntity.js';

export default class Npc extends GameEntity {
  /**
   * Creates a new NPC
   *
   * @param imageSrc a string
   * @param xPos number
   * @param yPos number
   */
  constructor(imageSrc:string, xPos: number, yPos: number) {
    super(imageSrc, xPos, yPos);
    this.setImageHeight(44);
    this.setImageWidth(31);
  }
}
