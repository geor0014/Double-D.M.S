import Dialog from './Dialog.js';
import GameEntity from './GameEntity.js';

export default class Npc extends GameEntity {
  // Dialogs which show up on the screen
  private dialogs: Dialog[];

  /**
   * Creates new NPC
   *
   * @param imageSrc image of npc
   * @param xPos X position
   * @param yPos Y position
   * @param dialogs dialogs of this Npc - STRING ARRAY
   */
  constructor(imageSrc: string, xPos: number, yPos: number, dialogs: Dialog[]) {
    super(imageSrc, xPos, yPos);
    this.dialogs = dialogs;
  }

  /**
   *  getter for dialogs
   *
   * @returns dialogs
   */
  public getDialogs(): Dialog[] {
    return this.dialogs;
  }
}
