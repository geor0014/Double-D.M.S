import Room from './Room.js';
import Scene from './Scene.js';
import Player from './Player.js';

export default class EasyHallway extends Room {
  private mainHallway: Room;

  public constructor(canvas: HTMLCanvasElement, mainHallway: Room, player: Player) {
    super(canvas, './assets/img/easyHallway.jpg');
    console.log('creating easy hallway');
    this.mainHallway = mainHallway;

    this.player = player;

    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    this.setXPos(0);
    this.setYPos(this.canvas.height / 4);

    this.player.setXPos(this.canvas.width / 2);
  }

  // eslint-disable-next-line class-methods-use-this
  public update(elapsed: number): Scene {
    // Clear the screen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.player.getXPos() >= 1450 && this.player.getYPos() <= 433) {
      this.player.setXPos(132);
      this.player.setYPos(371);
      this.player.setImage('./assets/img/player-boy-right.png');
      console.log('main halwway return');
      return this.mainHallway;
    }

    return null;
  }

  /*
  public drawRectengles(): void {
    this.ctx.beginPath();
    this.ctx.rect(1450, 433, 50, 50);
    this.ctx.stroke();
  }
  */
}
