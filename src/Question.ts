import MainText from './MainText.js';
import UserData from './UserData.js';

export default class Question extends MainText {
  private rightAnswer: string;

  private wrongAnswers: string[] = [];

  private rAnsPosition: number;

  private userData: UserData;

  /**
   * Creates new Question
   *
   * @param userData user data of player
   * @param qText text of question
   * @param rAns right answer
   * @param wAns1 wrong ans 1
   * @param wAns2 wrong ans 2
   */
  constructor(
    userData: UserData,
    qText: string,
    rAns: string,
    wAns1: string,
    wAns2: string
  ) {
    super(qText);
    this.userData = userData;
    this.rightAnswer = rAns;
    this.wrongAnswers.push(wAns1, wAns2);
    this.rAnsPosition = Question.randomNumber(0, 2);


  }

  /**
   *  getter of user data
   *
   * @returns user data
   */
  public getUserData(): UserData {
    return this.userData;
  }

  /**
   *  getter of Right ans position
   *
   * @returns number 1-3
   */
  public getRPos(): number {
    return this.rAnsPosition;
  }

  /**
   *  getter of right answer
   *
   * @returns right answer string
   */
  public getRAns(): string {
    return this.rightAnswer;
  }

  /**
   *  getter of wrong answer
   *
   * @param i number 1-2
   * @returns wrong answer string
   */
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
