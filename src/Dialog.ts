import MainText from './MainText.js';

export default class Dialog extends MainText {
  private possibleAns: string[];

  private replies: string[];

  /**
   * creates a new dialog
   *
   * @param dText string for the text
   * @param answers string array for answers
   * @param replies string array for replies from NPCs
   */
  constructor(dText: string, answers: string[], replies: string[]) {
    super(dText);
    this.possibleAns = answers;
    this.replies = replies;
  }

  public getAnswers():string[] {
    return this.possibleAns;
  }

  public getReplies():string[] {
    return this.replies;
  }
}
