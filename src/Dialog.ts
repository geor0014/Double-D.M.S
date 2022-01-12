import MainText from './MainText.js';

export default class Dialog extends MainText {
  private possibleAns: string[];

  private replies: string[];

  constructor(dText: string, answers: string[], replies: string[]) {
    super(dText);
    this.possibleAns = answers;
    this.replies = replies;
  }
}
