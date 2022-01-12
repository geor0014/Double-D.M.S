import MainText from './MainText.js';
import UserData from './UserData.js';

export default class Question extends MainText {
  private rightAnswer: string;

  private wrongAnswers: string[] = [];

  private rAnsPosition: number;

  private userData: UserData;

  constructor(userData: UserData, qText: string, rAns: string, wAns1: string, wAns2: string) {
    super(qText);
    this.userData = userData;
    this.rightAnswer = rAns;
    this.wrongAnswers.push(wAns1, wAns2);
    this.rAnsPosition = Question.randomNumber(0, 2);
  }

  public getUserData(): UserData {
    return this.userData;
  }

  public getRPos(): number {
    return this.rAnsPosition;
  }

  public getRAns(): string {
    return this.rightAnswer;
  }

  public getWAns(i: number): string {
    return this.wrongAnswers[i];
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
