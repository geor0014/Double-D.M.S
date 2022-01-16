import MainText from './MainText.js';

export default class Dialog extends MainText {
  // private possibleAns: string[];

  // private replies: string[];

  /**
   * creates a new dialog
   *
   * @param dText string for the text
   */
  constructor(dText: string) {
    super(dText);
    // this.possibleAns = answers;
    // this.replies = replies;
  }
}
