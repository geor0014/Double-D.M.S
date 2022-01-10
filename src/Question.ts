export default class Question {
  private questionText: string;

  private rightAnswer: string;

  private wrongAnswer1: string;

  private wrongAnswer2: string;

  private rAnsPosition: number;

  constructor(qText: string, rAns: string, wAns1: string, wAns2: string) {
    this.questionText = qText;
    this.rightAnswer = rAns;
    this.wrongAnswer1 = wAns1;
    this.wrongAnswer2 = wAns2;
    this.rAnsPosition = Question.randomNumber(1, 3);
  }

  public getRPos(): number {
    return this.rAnsPosition;
  }

  /**
   * Returns a random number between min and max
   *
   * @param min - lower boundary
   * @param max - upper boundary
   * @returns a random number between min and max
   */
  public static randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}
