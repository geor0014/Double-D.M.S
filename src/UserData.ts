export default class UserData {
  private hintAmount: number;

  private candyAmount: number;

  private name: string;

  private img: HTMLImageElement;

  constructor() {
    this.name = 'Player';
    this.img = new Image();
    this.img.src = './assets/img/player-boy-up.png';
    this.hintAmount = 0;
    this.candyAmount = 0;
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
