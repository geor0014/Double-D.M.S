import Scene from './Scene.js';
import Npc from './Npc.js';
import Door from './Door.js';
import Menu from './Menu.js';
import Collectibles from './collectibles.js';
import Candy from './Candy.js';
import Hint from './Hint.js';
import DialogScreen from './DialogScreen.js';
import HintScreen from './HintScreen.js';
import Hitbox from './Hitbox.js';
import Dialog from './Dialog.js';

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

  protected collectibles: Collectibles[];

  protected npcs: Npc[];

  protected doors: Door[];

  protected menu: Menu;

  protected isMenuShowing: boolean;

  protected doorOpen: HTMLAudioElement;

  protected doorClose: HTMLAudioElement;

  protected hitboxes: Hitbox[];

  /**
   * Create a new room
   *
   * @param canvas canvas element
   * @param imgSrc source for image
   * @param state boolean for the menubar
   */
  constructor(
    canvas: HTMLCanvasElement,
    imgSrc: string,
    state: boolean = false
  ) {
    super(canvas);

    // setting canvas position
    const canvasPosition = this.canvas.getBoundingClientRect();

    this.canvas.addEventListener('click', (event) => {
      // eslint-disable-next-line @typescript-eslint/func-call-spacing
      // console.log(this.player.getXPos(), this.player.getYPos());
      // alert (`${this.player.getXPos()} ${this.player.getYPos()}`);
      console.log(event.x - canvasPosition.left, event.y - canvasPosition.top);
    });

    // creates new image and src
    this.img = new Image();
    this.img.src = imgSrc;

    // creates audio for the doors
    this.doorClose = new Audio('./assets/sound/DoorClose.ogg');
    this.doorOpen = new Audio('./assets/sound/DoorOpen.ogg');

    // creates new menu
    this.menu = new Menu(this.canvas.width / 3 - 100, 600);

    // state of menu
    this.isMenuShowing = false;

    // hit boxes
    this.hitboxes = [];
  }

  /**
   * getter for x position
   *
   * @returns xPos
   */
  getXPos(): number {
    return this.xPos;
  }

  /**
   * setter for x position
   *
   * @param newPos new Xposition
   */
  setXPos(newPos: number): void {
    this.xPos = newPos;
  }

  /**
   * getter for y position
   *
   * @returns y position
   */
  getYPos(): number {
    return this.yPos;
  }

  /**
   * setter for y position
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
   * Removes collectibles items from the game based on box collision detection.
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
   * Checks if player is interacting with MENU/COLLECTIBLES/NPC in each room
   *
   * @returns scene
   */
  protected generalInteraction(): Scene {
    // console.log(` score ${this.player.getUserData().getScore()}`);
    // console.log(this.frameCounter);
    // Clear the screen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // reading hint
    if (
      this.player.isReadingHint() &&
      this.player.getUserData().getHintAmount() > 0
    ) {
      this.player
        .getUserData()
        .setHintAmount(this.player.getUserData().getHintAmount() - 1);
      // console.log(this.player.getUserData().getHintAmount());
      this.player
        .getUserData()
        .setHintNum(this.player.getUserData().getHintNum() + 1);
      return new HintScreen(
        this.canvas,
        this,
        this.player.getUserData().getHintNum() - 1
      );
    }

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
      // interaction with NPC
      for (let i = 0; i < this.npcs.length; i += 1) {
        if (this.player.collidesWith(this.npcs[i])) {
          const currentNPC: Npc = this.npcs[i];

          currentNPC.getDialogs().forEach((str) => {
            if (str.getText(0) === 'Hello, I lost my backpack....') {
              this.player.getUserData().getQuests().push('Find backpack');
              this.npcs.splice(i, 1);
            }

            if (
              str.getText(0) ===
              'Hey there! Have you seen a teddy bear around here?'
            ) {
              this.player.getUserData().getQuests().push('Look for Teddy');
              this.npcs.splice(i, 1);
            }

            if (str.getText(0) === 'Hey, listen...have you seen a doll?') {
              this.player.getUserData().getQuests().push('Help find doll');
              this.npcs.splice(i, 1);
            }
          });

          return new DialogScreen(this.canvas, this, currentNPC.getDialogs());
        }
      }

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
      this.filterQuestItems();
    }

    this.frameCounter += 1;
    return null;
  }

  private filterQuestItems(): void {
    // REMOVES QUESTITEM FROM QUESTS
    this.player
      .getUserData()
      .getQuestItems()
      .forEach((item, i) => {
        //
        if (this.player.collidesWith(item)) {
          //
          console.log(this.player.getUserData().getQuestItems());

          if (item.getName() === 'backpack') {
            this.player.getUserData().getQuests().splice(i, 1);
            this.player.getUserData().getQuestItems().splice(i, 1);
            this.player
              .getUserData()
              .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
          }

          if (item.getName() === 'teddy') {
            this.player.getUserData().getQuests().splice(i, 1);
            this.player.getUserData().getQuestItems().splice(i, 1);
            this.player
              .getUserData()
              .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
          }

          if (item.getName() === 'doll') {
            this.player.getUserData().getQuests().splice(i, 1);
            this.player.getUserData().getQuestItems().splice(i, 1);
            this.player
              .getUserData()
              .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
          }
          //
        }
      });
  }

  private drawQuestItems(): void {
    // DRAWS QUEST INFO TO MENU
    if (this.player.getUserData().getQuests()[0]) {
      this.writeTextToCanvas(
        this.player.getUserData().getQuests()[0],
        30,
        482,
        637,
        'left',
        'black'
      );
    }

    if (this.player.getUserData().getQuests()[1]) {
      this.writeTextToCanvas(
        this.player.getUserData().getQuests()[1],
        30,
        482,
        672,
        'left',
        'black'
      );
    }
    if (this.player.getUserData().getQuests()[2]) {
      this.writeTextToCanvas(
        this.player.getUserData().getQuests()[2],
        30,
        482,
        704,
        'left',
        'black'
      );
    }
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

    this.writeTextToCanvas(
      'press M to hide/unhide menu',
      24,
      this.canvas.width / 2,
      this.canvas.height - 50,
      'center',
      'red'
    );

    this.writeTextToCanvas(
      'press Space to ineract',
      24,
      this.canvas.width / 2,
      this.canvas.height - 80,
      'center',
      'red'
    );

    // DRAWS NPCS
    for (let i = 0; i < this.npcs.length; i += 1) {
      this.npcs[i].draw(this.ctx);
    }

    // DRAWS COLLECTTIBLES
    for (let i = 0; i < this.collectibles.length; i++) {
      this.collectibles[i].draw(this.ctx);
    }

    // DRAWS DOORS
    for (let i = 0; i < this.doors.length; i += 1) {
      this.doors[i].draw(this.ctx);
    }

    // DRAWS PLAYER
    this.player.draw(this.ctx);

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
      // DRAWS QUEST ITEMS
      this.drawQuestItems();

      this.ctx.drawImage(this.hintNumImg, 270, 680, 50, 50);
      this.ctx.drawImage(this.candyNumImg, 415, 680, 50, 50);
    }

    // this.menu.draw(this.ctx);
  }
}
