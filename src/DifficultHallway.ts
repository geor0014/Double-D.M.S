import Player from './Player.js';
import Room from './Room.js';
import Scene from './Scene.js';

export default class DifficultHallway extends Room {
  private mainHallway: Room;

  public constructor(canvas: HTMLCanvasElement, mainHallway: Room, player: Player) {
    super(canvas, './assets/img/easyHallway.jpg');

    console.log('creating difficult hallway');

    this.mainHallway = mainHallway;

    this.player = player;

    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    this.setXPos(0);
    this.setYPos(this.canvas.height / 4);

    this.player.setXPos(this.player.getImage().width);
  }

  public update(elapsed: number): Scene {
    // Clear the screen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.player.getXPos() <= 0 && this.player.getYPos() <= 433) {
      this.player.setXPos(1368);
      this.player.setYPos(371);
      this.player.setImage('./assets/img/player-boy-left.png');
      return this.mainHallway;
    }

    return null;
  }

  public render(): void {
    this.draw(this.ctx);
    super.render();
  }
/*
  public drawRectengles(): void {
    this.ctx.beginPath();
    this.ctx.rect(0, 433, 50, 50);
    this.ctx.stroke();
  }
  */
}
