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

export default abstract class Room extends Scene {
  // X position of the image of the room
  private xPos: number;

  // Y position of the image of the room
  private yPos: number;

  // image which displays according to the number of the hints
  private hintNumImg: HTMLImageElement;

  // image which displays according to the number of the candy
  private candyNumImg: HTMLImageElement;

  // counter for the frames
  private frameCounter: number = 0;

  // Image of the room
  private img: HTMLImageElement;

  // all the collectibles
  private collectibles: Collectibles[];

  // all the npcs
  private npcs: Npc[];

  // all the doors
  private doors: Door[];

  // the menu bar
  private menu: Menu;

  // boolean to hide and unhide the menu bar (toggle)
  private isMenuShowing: boolean;

  // audio when a door opens
  private doorOpen: HTMLAudioElement;

  // audio when a door closes
  private doorClose: HTMLAudioElement;

  // the hitboxes
  private hitboxes: Hitbox[];

  // frame so the image knows what to show
  private frameX = 0;

  // frame so the image knows what to show
  private frameY = 0;

  // frame counter of the update
  private gameFrame = 0;

  // sound for collecting
  private charSelectSound: HTMLAudioElement;

  /**
   * Create a new room
   *
   * @param canvas canvas element
   * @param imgSrc source for image
   */
  public constructor(
    canvas: HTMLCanvasElement,
    imgSrc: string,
  ) {
    super(canvas);

    // setting canvas position
    // const canvasPosition = this.canvas.getBoundingClientRect();

    // this.canvas.addEventListener('click', (event) => {
    //   // eslint-disable-next-line @typescript-eslint/func-call-spacing
    //   // console.log(this.player.getXPos(), this.player.getYPos());
    //   // alert (`${this.player.getXPos()} ${this.player.getYPos()}`);
    //   console.log(event.x - canvasPosition.left, event.y - canvasPosition.top);
    // });

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

    // setting audio
    this.charSelectSound = new Audio('./assets/sound/charSelect.wav');
  }

  /**
   * HITBOX DETECTION AND MOVING THE PLAYER
   */
  public processInput(): void {
    let isPlayerColliding: string = 'none';

    // checks if the player collides with a hitbox and moves the player accordingly
    this.hitboxes.forEach((box) => {
      if (this.player.rectCollision(box, this.player) !== 'none') {
        isPlayerColliding = this.player.rectCollision(box, this.player);
      }
    });
    this.player.setCollision(isPlayerColliding);

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
      this.player.isReadingHint()
      && this.player.getUserData().getHintAmount() > 0
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
        this.player.getUserData().getHintNum() - 1,
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

          // sets the quests according to the npc
          currentNPC.getDialogs().forEach((str) => {
            if (str.getText(0) === 'Hello, I lost my backpack....') {
              this.player.getUserData().getQuests().push('Find backpack');
              this.npcs.splice(i, 1);
            }

            if (
              str.getText(0) === 'Hey there! Have you seen a teddy bear around here?'
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

      // checks if the player collected a collectible
      this.collectibles.forEach((item) => {
        if (this.player.collidesWith(item)) {
          this.collectCollectibles();
          // WITH CANDY
          if (item instanceof Candy) {
            this.player
              .getUserData()
              .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
            // console.log(this.player.getUserData().getCandyAmount());

            // WITH HINT
          } else if (item instanceof Hint) {
            this.player
              .getUserData()
              .setHintAmount(this.player.getUserData().getHintAmount() + 1);

            // console.log(this.player.getUserData().getHintAmount());
          }
        }
      });

      this.filterQuestItems();
    }

    this.frameCounter += 1;
    return null;
  }

  /**
   * Filters through the quest items
   */
  private filterQuestItems(): void {
    // REMOVES QUESTITEM FROM QUESTS
    this.player
      .getUserData()
      .getQuestItems()
      .forEach((item, i, array) => {
        if (this.player.collidesWith(item)) {
          // console.log(this.player.getUserData().getQuestItems());

          if (item.getName() === 'backpack') {
            array.splice(i, 1);
            const index = this.player.getUserData().getQuests().findIndex((str) => str === 'Find backpack');
            this.player.getUserData().getQuests().splice(index, 1);
            this.charSelectSound.play();
            this.player
              .getUserData()
              .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
          }

          if (item.getName() === 'teddy') {
            array.splice(i, 1);
            const index = this.player.getUserData().getQuests().findIndex((str) => str === 'Look for Teddy');
            this.player.getUserData().getQuests().splice(index, 1);
            this.charSelectSound.play();
            this.player
              .getUserData()
              .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
          }

          if (item.getName() === 'doll') {
            array.splice(i, 1);
            const index = this.player.getUserData().getQuests().findIndex((str) => str === 'Help find doll');
            this.player.getUserData().getQuests().splice(index, 1);
            this.charSelectSound.play();
            this.player
              .getUserData()
              .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
          }
        }
      });
  }

  private drawQuestItems(): void {
    // DRAWS QUEST INFO TO MENU
    if (this.player.getUserData().getQuests()[0]) {
      this.writeTextToCanvas(
        this.player.getUserData().getQuests()[0],
        30,
        620,
        647,
        'left',
        'black',
      );
    }

    if (this.player.getUserData().getQuests()[1]) {
      this.writeTextToCanvas(
        this.player.getUserData().getQuests()[1],
        30,
        620,
        682,
        'left',
        'black',
      );
    }
    if (this.player.getUserData().getQuests()[2]) {
      this.writeTextToCanvas(
        this.player.getUserData().getQuests()[2],
        30,
        620,
        714,
        'left',
        'black',
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
   * Draws hitboxes
   */
  protected drawHitBoxes(): void {
    this.hitboxes.forEach((box) => {
      box.draw(this.canvas);
    });
  }

  /**
   * Adds a new hitbox to the array
   *
   * @param x number of the position of the hitbox
   * @param y number of the position of the hitbox
   * @param w number of the width
   * @param h number of the height
   * @param opacity of the hitbox
   */
  protected insertHitbox(
    x: number,
    y: number,
    w: number,
    h: number,
    opacity: number,
  ): void {
    this.hitboxes.push(new Hitbox(x, y, w, h, opacity));
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
      'Blue',
    );

    this.writeTextToCanvas(
      'press Space to ineract',
      24,
      this.canvas.width / 2,
      this.canvas.height - 80,
      'center',
      'Blue',
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
      } else if (this.player.getUserData().getHintAmount() === 6) {
        this.hintNumImg = Scene.loadNewImage('./assets/img/6.png');
      } else if (this.player.getUserData().getHintAmount() === 7) {
        this.hintNumImg = Scene.loadNewImage('./assets/img/7.png');
      } else if (this.player.getUserData().getHintAmount() === 8) {
        this.hintNumImg = Scene.loadNewImage('./assets/img/8.png');
      } else if (this.player.getUserData().getHintAmount() === 9) {
        this.hintNumImg = Scene.loadNewImage('./assets/img/9.png');
      } else if (this.player.getUserData().getHintAmount() === 10) {
        this.hintNumImg = Scene.loadNewImage('./assets/img/10.png');
      } else if (this.player.getUserData().getHintAmount() === 0) {
        this.hintNumImg = Scene.loadNewImage('./assets/img/0.png');
      } else {
        this.hintNumImg = Scene.loadNewImage('./assets/img/10.png');
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
      } else if (this.player.getUserData().getCandyAmount() === 6) {
        this.candyNumImg = Scene.loadNewImage('./assets/img/6.png');
      } else if (this.player.getUserData().getCandyAmount() === 7) {
        this.candyNumImg = Scene.loadNewImage('./assets/img/7.png');
      } else if (this.player.getUserData().getCandyAmount() === 8) {
        this.candyNumImg = Scene.loadNewImage('./assets/img/8.png');
      } else if (this.player.getUserData().getCandyAmount() === 9) {
        this.candyNumImg = Scene.loadNewImage('./assets/img/9.png');
      } else if (this.player.getUserData().getCandyAmount() === 10) {
        this.candyNumImg = Scene.loadNewImage('./assets/img/10.png');
      } else if (this.player.getUserData().getCandyAmount() === 0) {
        this.candyNumImg = Scene.loadNewImage('./assets/img/0.png');
      } else {
        this.candyNumImg = Scene.loadNewImage('./assets/img/10.png');
      }

      // DRAWS QUEST ITEMS
      this.drawQuestItems();

      // draws the numbers of the hints and candy
      this.ctx.drawImage(this.hintNumImg, 400, 670, 50, 50);
      this.ctx.drawImage(this.candyNumImg, 545, 670, 50, 50);

      // draws the player according to the cnumb
      const cNum: number = this.player.getCharacterNum();
      let characterImg: HTMLImageElement = Scene.loadNewImage('');
      if (cNum === 1) {
        characterImg = Scene.loadNewImage('./assets/img/boy1Face.png');
      } else if (cNum === 2) {
        characterImg = Scene.loadNewImage('./assets/img/boy2Face.png');
      } else if (cNum === 3) {
        characterImg = Scene.loadNewImage('./assets/img/girl2face.png');
      } else if (cNum === 4) {
        characterImg = Scene.loadNewImage('./assets/img/girl1face.png');
      }
      this.ctx.drawImage(characterImg, 280, 600, 130, 130);
    }

    // this.menu.draw(this.ctx);
  }

  /**
   * Getter for collectibles array
   *
   * @returns collectibles array
   */
  public getCollectibles(): Collectibles[] {
    return this.collectibles;
  }

  /**
   * Setter for collectibles array
   *
   * @param arrayColl array collectibles
   */
  public setCollectibles(arrayColl: Collectibles[]): void {
    this.collectibles = arrayColl;
  }

  /**
   * Getter for npc array
   *
   * @returns npc array
   */
  public getNpcs(): Npc[] {
    return this.npcs;
  }

  /**
   * Setter for npc array
   *
   * @param arrayNpc array npc
   */
  public setNpcs(arrayNpc: Npc[]): void {
    this.npcs = arrayNpc;
  }

  /**
   * Getter for door array
   *
   * @returns door array
   */
  public getDoors(): Door[] {
    return this.doors;
  }

  /**
   * Setter for door array
   *
   * @param arrayDoor array door
   */
  public setDoors(arrayDoor: Door[]): void {
    this.doors = arrayDoor;
  }

  /**
   * Getter for isMenuShowing boolean
   *
   * @returns true or false according to if the menu is showing
   */
  public getIsMenuShowing(): boolean {
    return this.isMenuShowing;
  }

  /**
   * Getter for doorOpen AudioElement
   *
   * @returns doorOpen AudioElement
   */
  public getDoorOpen(): HTMLAudioElement {
    return this.doorOpen;
  }

  /**
   * Getter for doorClose AudioElement
   *
   * @returns doorClose AudioElement
   */
  public getDoorClose(): HTMLAudioElement {
    return this.doorClose;
  }

  /**
   * Getter for FrameX number
   *
   * @returns frameX number
   */
  public getFrameX(): number {
    return this.frameX;
  }

  /**
   * Setter for FrameX number
   *
   * @param frame frameX number
   */
  public setFrameX(frame: number): void {
    this.frameX = frame;
  }

  /**
   * Getter for FrameY number
   *
   * @returns frameY number
   */
  public getFrameY(): number {
    return this.frameY;
  }

  /**
   * Setter for FrameY number
   *
   * @param frame FrameY number
   */
  public setFrameY(frame: number): void {
    this.frameY = frame;
  }

  /**
   * Getter for GameFrame number
   *
   * @returns GameFrame number
   */
  public getGameFrame(): number {
    return this.gameFrame;
  }

  /**
   * Setter for GameFrame number
   *
   * @param gameframe GameFrame number
   */
  public setGameFrame(gameframe: number): void {
    this.gameFrame = gameframe;
  }

  /**
   * getter for x position
   *
   * @returns xPos
   */
  public getXPos(): number {
    return this.xPos;
  }

  /**
   * setter for x position
   *
   * @param newPos new Xposition
   */
  public setXPos(newPos: number): void {
    this.xPos = newPos;
  }

  /**
   * getter for y position
   *
   * @returns y position
   */
  public getYPos(): number {
    return this.yPos;
  }

  /**
   * setter for y position
   *
   * @param newPos new Y Position
   */
  public setYPos(newPos: number): void {
    this.yPos = newPos;
  }
}
