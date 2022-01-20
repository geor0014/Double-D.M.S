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
      new Npc('./assets/img/OrangeHairStudentBackFacing.png', 652, 436, [
        new Dialog('Hey, listen...have you seen a doll?#'),
        new Dialog('My little sister lost hers and I am trying to find it.#'),
        new Dialog('If you see it, bring it to me tomorrow, okay?#'),
        new Dialog('Class is over, gotta go now. See you tomorrow!#'),
      ]),
      new Npc('./assets/img/BlondeHairTeacherFrontFacing.png', 714, 298, [
        new Dialog(
          'Today we are learning about suspicious links and strangers messeges#',
        ),
        new Dialog('This is very important!#'),
      ]),
    );
    this.collectibles.push(
      new Candy(this.canvas.width / 2, this.canvas.height / 2),
    );
    this.doors.push(new Door('./assets/img/boy-bathroom-door.png', 912, 265));
    this.insertHitbox(10, 10, 10, 10);
    console.log('Bathroom1');
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
  }
}
//# sourceMappingURL=Bathroom2%20copy.js.map
