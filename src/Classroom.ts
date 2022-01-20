import Room from './Room.js';
import Scene from './Scene.js';

import Player from './Player.js';

import Computer from './Computer.js';

import Question from './Question.js';

export default abstract class Classroom extends Room {
  // Room the player have previously been
  private previousScene: Scene;

  // computer ther player interacts with to asnwer the questions
  private computer: Computer;

  // questions which are displayed on the computer
  private questions: Question[];

  // interaction for the computer
  private pcInteract: boolean = false;

  /**
   * creats a new classroom
   *
   * @param canvas canvas element
   * @param previousScene a scene
   * @param player a player
   * @param state a way of hiding and unhidding the menu bar
   * @param imageSrc image src
   */
  public constructor(
    canvas: HTMLCanvasElement,
    previousScene: Scene,
    player: Player,
    state: boolean,
    imageSrc: string,
  ) {
    super(canvas, imageSrc, state);

    // sets the previous scene to return to
    this.previousScene = previousScene;

    // sets the player
    this.player = player;

    // sets the background image position
    this.setXPos(0);
    this.setYPos(0);

    // resets the items in the room
    this.collectibles = [];
    this.npcs = [];
    this.doors = [];
    this.questions = [];
  }

  /**
   * draws items to screen
   */
  public render(): void {
    this.draw(this.ctx);
    this.computer.draw(this.ctx);
    // calls the render function of the parent aka ROOM
    super.render();
    this.drawHitBoxes();
    console.log(this.player.getXPos(), this.player.getYPos());
  }

  /**
   * Getter for the previous scene
   *
   * @returns previous scene
   */
  public getPreviousScene(): Scene {
    return this.previousScene;
  }

  /**
   * Getter for the computer
   *
   * @returns the computer
   */
  public getComputer(): Computer {
    return this.computer;
  }

  /**
   * Getter for the questions
   *
   * @returns questions array
   */
  public getQuestions(): Question[] {
    return this.questions;
  }

  /**
   * Getter for the pc interact
   *
   * @returns true or false
   */
  public getPcInteract(): boolean {
    return this.pcInteract;
  }

  /**
   * Setter for the previous scene
   *
   * @param previousScene the previous scene
   */
  public setPreviousScene(previousScene: Scene): void {
    this.previousScene = previousScene;
  }

  /**
   * Setter for the computer
   *
   * @param computer the computer
   */
  public setComputer(computer: Computer): void {
    this.computer = computer;
  }

  /**
   * Setter for the questions
   *
   * @param questions array
   */
  public setQuestions(questions: Question[]): void {
    this.questions = questions;
  }

  /**
   * Setter for the pc interact
   *
   * @param pcInteract true or false
   */
  public setPcInteract(pcInteract: boolean): void {
    this.pcInteract = pcInteract;
  }
}
