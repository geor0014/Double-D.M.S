import Scene from './Scene.js';
import Npc from './Npc.js';
import Door from './Door.js';
import Menu from './Menu.js';
import Collectibles from './collectibles.js';
import Candy from './Candy.js';
import Hint from './Hint.js';

export default abstract class Room extends Scene {
  // X position of the image of the room
  private xPos: number;

  // Y position of the image of the room
  private yPos: number;

  private hintNumImg: HTMLImageElement;

  private candyNumImg: HTMLImageElement;

  private frameCounter: number = 0;

  // Image of the room
  protected img: HTMLImageElement;

  // player
  // protected player: Player;

  protected collectibles: Collectibles[];

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
   * @param state boolean for the menubar
   */
  constructor(canvas: HTMLCanvasElement, imgSrc: string, state: boolean = false) {
    super(canvas);

    const canvasPosition = this.canvas.getBoundingClientRect();

    this.canvas.addEventListener('click', (event) => {
      // eslint-disable-next-line @typescript-eslint/func-call-spacing
      // console.log(this.player.getXPos(), this.player.getYPos());
      // alert (`${this.player.getXPos()} ${this.player.getYPos()}`);
      console.log(event.x - canvasPosition.left, event.y - canvasPosition.top);
    });

    this.img = new Image();

    this.img.src = imgSrc;

    this.doorClose = new Audio('./assets/sound/DoorClose.ogg');
    this.doorOpen = new Audio('./assets/sound/DoorOpen.ogg');

    this.menu = new Menu(this.canvas.width / 3 - 30, 600);

    this.isMenuShowing = false;
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
   * Checks if player is interacting with MENU/COLLECTIBLES in each room
   */
  protected generalInteraction(): void {
    console.log(` score ${this.player.getUserData().getScore()}`);
    // console.log(this.frameCounter);
    // Clear the screen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // INTERACTION WITH MENU
    if (this.player.isInteractingMenu() && this.frameCounter === 7) {
      if (this.isMenuShowing === true) {
        this.isMenuShowing = false;
      } else if (this.isMenuShowing === false) {
        this.isMenuShowing = true;
      }
    }

    if (this.frameCounter === 7) {
      this.frameCounter = 0;
    }

    // WITH COLLECTIBLES
    if (this.player.isInteracting()) {
      this.collectibles.forEach((item) => {
        if (this.player.collidesWith(item)) {
          this.collectCollectibles();
          // WITH CANDY
          if (item instanceof Candy) {
            this.player
              .getUserData()
              .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
            console.log(this.player.getUserData().getCandyAmount());
            // WITH HINT
          } else if (item instanceof Hint) {
            this.player
              .getUserData()
              .setHintAmount(this.player.getUserData().getHintAmount() + 1);
            console.log(this.player.getUserData().getHintAmount());
          }
        }
      });
    }
    this.frameCounter += 1;
  }

  /**
   * Draw the room
   *
   * @param ctx of the canvas
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.img, this.xPos, this.yPos);
  }

  /**
   * Draw all the necessary items to the screen
   */
  public render(): void {
    // this.draw(this.ctx);

    // DRAWS COLLECTTIBLES
    for (let i = 0; i < this.collectibles.length; i++) {
      this.collectibles[i].draw(this.ctx);
    }

    // DRAWS NPCS
    for (let i = 0; i < this.npcs.length; i += 1) {
      this.npcs[i].draw(this.ctx);
    }

    // DRAWS DOORS
    for (let i = 0; i < this.doors.length; i += 1) {
      this.doors[i].draw(this.ctx);
    }

    // DRAWS MENU
    if (this.isMenuShowing) {
      // DRAWS HINTS
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

      // DRAWS CANDY
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

    // DRAS PALYER
    this.player.draw(this.ctx);
  }
}
