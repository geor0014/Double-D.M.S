import Scene from './Scene.js';
import Player from './Player.js';
import Candy from './Candy.js';
import Npc from './Npc.js';
import Hint from './Hint.js';
import Door from './Door.js';

export default abstract class Room extends Scene {
  // X position of the image of the room
  private xPos: number;

  // Y position of the image of the room
  private yPos: number;

  // Image of the room
  private img: HTMLImageElement;

  // player
  protected player: Player;

  protected collectibles: any[]; // change into class collectibles

  protected npcs: Npc[];

  protected doors: Door[];

  protected doorOpen: HTMLAudioElement;

  protected doorClose: HTMLAudioElement;

  /**
   * Create a new room
   *
   * @param canvas canvas element
   * @param imgSrc source for image
   */
  constructor(canvas: HTMLCanvasElement, imgSrc: string) {
    super(canvas);
    console.log(`loading a new image ${imgSrc}`);
    this.img = new Image();
    this.img.src = imgSrc;

    this.player = new Player(this.canvas);
    this.player.setXPos(732);
    this.player.setYPos(535);

    this.doorClose = new Audio('./assets/sound/DoorClose.ogg');
    this.doorOpen = new Audio('./assets/sound/DoorOpen.ogg');
    // console.log(this.img.width);
  }

  /**
   *
   * @returns xPos
   */
  getXPos(): number {
    return this.xPos;
  }

  /**
   *
   * @param newPos new Xposition
   */
  setXPos(newPos: number): void {
    this.xPos = newPos;
  }

  /**
   *
   * @returns y position
   */
  getYPos(): number {
    return this.yPos;
  }

  /**
   *
   * @param newPos new Y Position
   */
  setYPos(newPos: number): void {
    this.yPos = newPos;
  }

  /**
   * Methos to detect the input of the player
   */
  public processInput(): void {
    this.player.movePlayer(this.canvas);
  }

  /**
   * Removes candy items from the game based on box collision detection.
   *
   */
  public collectCollectibles(): void {
    // (filter the clicked candy item out of the array candy items)
    /*
    this.collectibles = this.collectibles.filter((element) => {
      // check if the player is over (collided with) the garbage item.
      if (this.player.collidesWith(element) && element instanceof Candy) {
        // Deleting the item from the array
        return false;
      }
      if (this.player.collidesWith(element) && element instanceof Hint) {
        // Deleting the item from the array
        return false;
      }
      return true;
    }); */
    this.collectibles.forEach((item, index) => {
      if (this.player.collidesWith(item)) {
        this.collectibles.splice(index, 1);
      }
    });
  }

  /**
   * Draw the room
   *
   * @param ctx of the canvas
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.img,
      this.xPos,
      this.yPos,
    );
  }

  /**
   * Draw all the necessary items to the screen
   */
  public render(): void {
    this.draw(this.ctx);
    for (let i = 0; i < this.collectibles.length; i++) {
      // console.log('drawing collectible');
      this.collectibles[i].draw(this.ctx);
    }

    for (let i = 0; i < this.npcs.length; i += 1) {
      this.npcs[i].draw(this.ctx);
    }

    for (let i = 0; i < this.doors.length; i += 1) {
      this.doors[i].draw(this.ctx);
    }
    // console.log('drawing player');
    // console.log(this.player.getXPos(), this.player.getYPos());
    this.player.draw(this.ctx);
  }
}
