export default class UserData {
  private name: string;

  private score: number;

  private level: number;

  constructor() {
    this.name = 'shirel';
    // window.prompt('Enter your name please');
    this.score = 0;
    this.level = 0;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getScore(): number {
    return this.score;
  }

  public addScore(points: number): void {
    this.score += points;
  }

  public getLevel(): number {
    return this.level;
  }

  public increaseLevel(): void {
    this.level += 1;
  }
}
