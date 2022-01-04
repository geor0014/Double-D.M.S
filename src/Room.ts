import Scene from './Scene.js';
import Npc from './Npc.js';
import Door from './Door.js';
import Menu from './Menu.js';

export default abstract class Room extends Scene {
  // X position of the image of the room
  private xPos: number;

  // Y position of the image of the room
  private yPos: number;

  private hintNumImg: HTMLImageElement;

  private candyNumImg: HTMLImageElement;

  // Image of the room
  protected img: HTMLImageElement;

  // player
  // protected player: Player;

  protected collectibles: any[]; // change into class collectibles

  protected npcs: Npc[];

  protected doors: Door[];

  protected menu: Menu;

  protected isMenuShowing: boolean;

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
    this.img = new Image();
    this.img.src = imgSrc;

    this.doorClose = new Audio('./assets/sound/DoorClose.ogg');
    this.doorOpen = new Audio('./assets/sound/DoorOpen.ogg');

    this.menu = new Menu(this.canvas.width / 3 - 30, 600);
    this.isMenuShowing = true;

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

    if (this.isMenuShowing) {
      // console.log('need to draw manu');
      this.menu.draw(this.ctx);
      if (this.player.getUserData().getHintAmount() === 1) {
        this.hintNumImg = Scene.loadNewImage('./assets/img/1.png');
      } else if (this.player.getUserData().getHintAmount() === 2) {
        this.hintNumImg = Scene.loadNewImage('./assets/img/2.png');
      } else if (this.player.getUserData().getHintAmount() === 3) {
        this.hintNumImg = Scene.loadNewImage('./assets/img/3.png');
      } else if (this.player.getUserData().getHintAmount() === 4) {
        this.hintNumImg = Scene.loadNewImage('./assets/img/4.png');
      } else if (this.player.getUserData().getHintAmount() === 5) {
        this.hintNumImg = Scene.loadNewImage('./assets/img/5.png');
      } else {
        this.hintNumImg = Scene.loadNewImage('./assets/img/0.png');
      }

      if (this.player.getUserData().getCandyAmount() === 1) {
        this.candyNumImg = Scene.loadNewImage('./assets/img/1.png');
      } else if (this.player.getUserData().getCandyAmount() === 2) {
        this.candyNumImg = Scene.loadNewImage('./assets/img/2.png');
      } else if (this.player.getUserData().getCandyAmount() === 3) {
        this.candyNumImg = Scene.loadNewImage('./assets/img/3.png');
      } else if (this.player.getUserData().getCandyAmount() === 4) {
        this.candyNumImg = Scene.loadNewImage('./assets/img/4.png');
      } else if (this.player.getUserData().getCandyAmount() === 5) {
        this.candyNumImg = Scene.loadNewImage('./assets/img/5.png');
      } else {
        this.candyNumImg = Scene.loadNewImage('./assets/img/0.png');
      }

      this.ctx.drawImage(this.hintNumImg, 489, 670);
      this.ctx.drawImage(this.candyNumImg, 639, 670);
    }

    // this.menu.draw(this.ctx);

    // console.log('drawing player');
    console.log(this.player.getXPos(), this.player.getYPos());
    this.player.draw(this.ctx);
  }
}
