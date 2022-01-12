export default class UserData {
  private hintAmount: number;

  private candyAmount: number;

  private name: string;

  private img: HTMLImageElement;

  private score: number;

  constructor() {
    this.name = 'Player';
    this.img = new Image();
    this.img.src = './assets/img/player-boy-up.png';
    this.hintAmount = 0;
    this.candyAmount = 0;
    this.score = 0;
  }

  public getScore(): number {
    return this.score;
  }

  public setScore(num: number): void {
    this.score = num;
  }

  public getHintAmount(): number {
    return this.hintAmount;
  }

  public getCandyAmount(): number {
    return this.candyAmount;
  }

  public setHintAmount(number: number): void {
    this.hintAmount = number;
  }

  public setCandyAmount(number: number): void {
    this.candyAmount = number;
  }
}
