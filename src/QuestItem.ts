import Collectibles from './collectibles.js';

export default class QuestItem extends Collectibles {
  private name: string;

  constructor(name: string, src: string, xPos: number, yPos: number) {
    super(src, xPos, yPos);

    this.name = name;
  }

  getName(): string {
    return this.name;
  }
}
