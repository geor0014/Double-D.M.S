import Door from './Door.js';
import Room from './Room.js';
import Candy from './Candy.js';
import Npc from './Npc.js';
import Dialog from './Dialog.js';
export default class Bathroom2 extends Room {
  previousScene;
  constructor(canvas, previousScene, player, state) {
    super(canvas, './assets/img/bathroom2.png', state);
    this.previousScene = previousScene;
    this.player = player;
    this.setXPos(0);
    this.setYPos(0);
    this.collectibles = [];
    this.npcs = [];
    this.doors = [];
    this.npcs.push(
      new Npc('./assets/img/greenBoy.png', 652, 436, [
        new Dialog('I am escaping class', ['ok', 'Me too'], ['', '']),
      ]),
    );
    this.collectibles.push(
      new Candy(this.canvas.width / 2, this.canvas.height / 2),
    );
    this.doors.push(new Door('./assets/img/boy-bathroom-door.png', 912, 265));
    this.insertHitbox(910, 435.5, 50, 70, 1);
    this.insertHitbox(956, 136.5, 10, 242, 1);
    this.insertHitbox(479, 181.5, 410, 70, 1);
    this.insertHitbox(909, 298.5, 10, 10, 1);
    this.insertHitbox(233, 535.5, 630, 10, 1);
    this.insertHitbox(432, 311.5, 45, 160, 1);
    this.insertHitbox(336, 180.5, 45, 290, 1);
    this.insertHitbox(240, 180.5, 45, 290, 1);
    this.insertHitbox(170, 179.5, 21, 370, 1);
    this.insertHitbox(188, 122, 720, 10, 1);
  }
  update(elapsed) {
    const nextScene = this.generalInteraction();
    if (this.player.isInteracting()) {
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          this.doorClose.play();
          console.log(this.previousScene);
          this.player.setXPos(100);
          this.player.setYPos(300);
          const cNum = this.player.getCharacterNum();
          if (cNum === 1) {
            this.player.setImage('./assets/img/PlayerBoy1Down.png');
          } else if (cNum === 2) {
            this.player.setImage('./assets/img/playerBoy2Down.png');
          } else if (cNum === 3) {
            this.player.setImage('./assets/img/playerGirl2Down.png');
          } else if (cNum === 4) {
            this.player.setImage('./assets/img/playerGirl1Down.png');
          }
          return this.previousScene;
        }
      }
    }
    console.log(`score is ${this.player.getUserData().getScore()}`);
    if (nextScene !== null) {
      return nextScene;
    }
    return null;
  }
  render() {
    this.draw(this.ctx);
    super.render();
    this.drawHitBoxes();
  }
}
//# sourceMappingURL=Bathroom2.js.map
