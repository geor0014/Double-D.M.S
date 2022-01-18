import QuestItem from './QuestItem.js';

export default class UserData {
  private hintAmount: number;

  private candyAmount: number;

  private img: HTMLImageElement;

  private score: number;

  private hintNum: number;

  private quests: string[] = [];

  private questItems: QuestItem[] = [];

  /**
   * Creates the new user data
   *
   * @param characterNum number presenting the choice
   */
  constructor() {
    this.img = new Image();
    this.img.src = './assets/img/player-boy-up.png';
    this.hintAmount = 0;
    this.candyAmount = 0;
    this.score = 0;
    this.hintNum = 0;

    const questItems = new Set<QuestItem>();
  }

  /**
   * Getter for the relevant hint
   *
   * @returns hint number
   */
  public getHintNum(): number {
    return this.hintNum;
  }

  /**
   * Setter  for current hint
   *
   * @param num hint number
   */
  public setHintNum(num: number): void {
    this.hintNum = num;
  }

  /**
   * Getter for current score
   *
   * @returns score
   */
  public getScore(): number {
    return this.score;
  }

  /**
   * Setter for score
   *
   * @param num score
   */
  public setScore(num: number): void {
    this.score = num;
  }

  /**
   * Getter amount of hints
   *
   * @returns hint number
   */
  public getHintAmount(): number {
    return this.hintAmount;
  }

  /**
   * Getter amount of candy
   *
   * @returns candy number
   */
  public getCandyAmount(): number {
    return this.candyAmount;
  }

  /**
   * Setter for hint amount
   *
   * @param number hint amount
   */
  public setHintAmount(number: number): void {
    this.hintAmount = number;
  }

  /**
   * Setter for candy amount
   *
   * @param number candy amount
   */
  public setCandyAmount(number: number): void {
    this.candyAmount = number;
  }

  /**
   * Getter for the quests
   *
   * @returns the quests
   */
  public getQuests(): string[] {
    return this.quests;
  }

  /**
   * Getter for the quests items
   *
   * @returns the quests items
   */
  public getQuestItems(): QuestItem[] {
    return this.questItems;
  }
}
