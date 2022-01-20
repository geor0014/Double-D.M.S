import QuestItem from './QuestItem.js';

export default class UserData {
  // amount of the hints the player has
  private hintAmount: number;

  // amount of the candy the player has
  private candyAmount: number;

  // image of the player
  private img: HTMLImageElement;

  // score of the player
  private score: number;

  // number of hints
  private hintNum: number;

  // quests the player has
  private quests: string[] = [];

  // quest items the player shall collect
  private questItems: QuestItem[] = [];

  /**
   * Initialises every attribute
   */
  public constructor() {
    this.img = new Image();
    this.img.src = './assets/img/player-boy-up.png';
    this.hintAmount = 0;
    this.candyAmount = 0;
    this.score = 0;
    this.hintNum = 0;
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
