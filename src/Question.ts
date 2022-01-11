export default class Question {
  private questionText: string;

  private rightAnswer: string;

  private wrongAnswers: string[] = [];

  private rAnsPosition: number;

  private part1: string;

  private part2: string;

  private part3: string;

  constructor(qText: string, rAns: string, wAns1: string, wAns2: string) {
    this.questionText = qText;
    this.rightAnswer = rAns;
    this.wrongAnswers.push(wAns1, wAns2);
    this.rAnsPosition = Question.randomNumber(0, 2);
    this.part1 = '';
    this.part2 = '';
    this.part3 = '';
    this.splitQText();
  }

  private splitQText(): void {
    let i: number = 0;
    const hCount = this.countHashTags();
    if (hCount === 0) {
      this.part1 = this.questionText;
    }

    for (let h = 0; h <= hCount; h += 1) {
      while (this.questionText[i] !== '#' && i < this.questionText.length) {
        if (h === 0) {
          this.part1 += this.questionText[i];
        } else if (h === 1) {
          this.part2 += this.questionText[i];
        } else if (h === 2) {
          this.part3 += this.questionText[i];
        }
        i += 1;
      }
      i += 1;
    }
  }

  private countHashTags(): number {
    let countH: number = 0;
    for (let i = 0; i < this.questionText.length; i += 1) {
      if (this.questionText[i] === '#') {
        countH += 1;
      }
    }
    console.log(`hashtag counter ${countH}`);
    return countH;
  }

  public getRPos(): number {
    return this.rAnsPosition;
  }

  public getQTxt(i: number): string {
    if (i === 0) {
      return this.part1;
    }
    if (i === 1) {
      return this.part2;
    }
    return this.part3;
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
