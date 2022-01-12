import Dialog from './Dialog.js';
import GameEntity from './GameEntity.js';

export default class Npc extends GameEntity {
  private dialogs: Dialog[];

  constructor(imageSrc: string, xPos: number, yPos: number, dialogs: Dialog[]) {
    super(imageSrc, xPos, yPos);
    this.dialogs = dialogs;
  }

  public getDialogs(): Dialog[] {
    return this.dialogs;
  }
}
