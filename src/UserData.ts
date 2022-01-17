import QuestItem from './QuestItem.js';

export default class UserData {
  private hintAmount: number;

  private candyAmount: number;

  private name: string;

  private img: HTMLImageElement;

  private score: number;

  private hintNum: number;

  private quests: string[] = [];

  private questItems: QuestItem[] = [];

  constructor() {
    this.name = 'Player';
    this.img = new Image();
    this.img.src = './assets/img/player-boy-up.png';
    this.hintAmount = 0;
    this.candyAmount = 0;
    this.score = 0;
    this.hintNum = 0;

    const questItems = new Set<QuestItem>();
  }

  public getHintNum(): number {
    return this.hintNum;
  }

  public setHintNum(num: number): void {
    this.hintNum = num;
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

  public getQuests(): string[] {
    return this.quests;
  }

  public getQuestItems(): QuestItem[] {
    return this.questItems;
  }
}
