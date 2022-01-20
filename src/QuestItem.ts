import Collectibles from './collectibles.js';

export default class QuestItem extends Collectibles {
  // name of the quest item
  private name: string;

  /**
   * Initialises every attribute
   *
   * @param name of the quest item
   * @param src string of the quest item
   * @param xPos of the quest iten
   * @param yPos of the quest item
   */
  public constructor(name: string, src: string, xPos: number, yPos: number) {
    super(src, xPos, yPos);

    this.name = name;
  }

  /**
   * Getter for the name
   *
   * @returns the name of the quest item
   */
  public getName(): string {
    return this.name;
  }
}
