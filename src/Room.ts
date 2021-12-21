import Scene from './Scene.js';
import Player from './Player.js';
import Game from './Game.js';
import GameItem from './GameEntity.js';

export default class Room extends Scene {
  // TO DO
  private player: Player;

  // Garbage items (the player needs to pick these up)
  private scoringObjects: GameItem[]; // TODO switch to correct type

  // Amount of frames until the next item
  private countUntilNextItem: number;

  private randomItem: number;

  /**
   *
   * @param game
   * @param canvas
   */
  constructor(game: Game) {
    super(game);
    this.scoringObjects = [];

    // Create garbage items
    for (let i = 0; i < Scene.randomNumber(3, 10); i++) {
      this.createRandom();
    }

    // Create player
    this.player = new Player(this.canvas.width - 76, this.canvas.height - 92);

    // Take about 5 seconds on a decent computer to show next item
    this.countUntilNextItem = 300;
  }

  public processInput(): void {
    this.player.movePlayer(this.canvas);
  }

  /**
   * Removes garbage items from the game based on box collision detection.
   *
   * Read for more info about filter function: https://alligator.io/js/filter-array-method/
   */
  private cleanUpGarbage() {
    // create a new array with garbage item that are still on the screen
    // (filter the clicked garbage item out of the array garbage items)
    this.scoringObjects = this.scoringObjects.filter((element) => {
      // check if the player is over (collided with) the garbage item.
      if (this.player.collidesWith(element)) {
        // removing the garbage item from the array
        this.game.userData.addScore(element.getScore());
        // Do not include this item.
        return false;
      }
      return true;
    });
  }

  /**
   * Game cycle, basically loop that keeps the game running. It contains all
   * the logic needed to draw the individual frames.
   *
   * @param elapsed a number
   * @returns a scene or null
   */
  public update(elapsed: number): Scene {
    // Clear the screen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Move the player
    this.processInput();

    // Draw everything
    // this.render();

    // Player cleans up garbage
    if (this.player.isCleaning()) {
      this.cleanUpGarbage();
    }

    // Show score
    // TODO: fix actual score system
    this.writeTextToCanvas(`Score: ${this.game.userData.getScore()}`, 36, 120, 50);

    // Create new items if necessary
    if (this.countUntilNextItem === 0) {
      const choice = Scene.randomNumber(0, 10);

      if (choice < 5) {
        this.createRandom();
      }

      // Reset the timer with a count between 2 and 4 seconds on a
      // decent computer
      this.countUntilNextItem = Scene.randomNumber(120, 240);
    }

    // Lower the count until the next item with 1
    this.countUntilNextItem -= 1;

    // Make sure the game actually loops
    // requestAnimationFrame(this.loop);

    return null;
  }

  private createRandom(): void {
    this.randomItem = Scene.randomNumber(1, 2);
    if (this.randomItem === 1) {
      this.scoringObjects.push(new Garbage(this.canvas.width - 32,
        this.canvas.height - 32));
    } else {
      this.scoringObjects.push(new Egg(this.canvas.width - 32,
        this.canvas.height - 32));
    }
  }

  /**
 * Draw all the necessary items to the screen
 */
  public render(): void {
    this.scoringObjects.forEach((element) => {
      element.draw(this.ctx);
    });
    this.player.draw(this.ctx);
  }
}
