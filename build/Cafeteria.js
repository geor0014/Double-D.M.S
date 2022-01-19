import Door from './Door.js';
import Room from './Room.js';
import Candy from './Candy.js';
import Npc from './Npc.js';
import Dialog from './Dialog.js';
export default class Cafeteria extends Room {
    previousScene;
    constructor(canvas, previousScene, player, state) {
        super(canvas, './assets/img/diningroom.png', state);
        this.previousScene = previousScene;
        this.player = player;
        this.setXPos(0);
        this.setYPos(0);
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.npcs.push(new Npc('./assets/img/student-orange-hair-back-faced.png', 652, 436, [
            new Dialog('Hello, this is some delicious food they have here#'),
            new Dialog('I love french fries, how about you?#'),
        ]), new Npc('./assets/img/teacher-blonde-hair-front-faced.png', 714, 298, [
            new Dialog('Hurry up, everyone, class starts in 10 minutes!!#'),
        ]));
        this.collectibles.push(new Candy(this.canvas.width / 2, this.canvas.height / 2));
        this.doors.push(new Door('./assets/img/cafeteria-door.png', 907, 362));
        this.insertHitbox(10, 10, 10, 10, 1);
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.doorClose.play();
                    console.log(this.previousScene);
                    this.player.setXPos(291);
                    this.player.setYPos(361);
                    const cNum = this.player.getCharacterNum();
                    if (cNum === 1) {
                        this.player.setImage('./assets/img/player-boy1-down.png');
                    }
                    else if (cNum === 2) {
                        this.player.setImage('./assets/img/player-boy2-down.png');
                    }
                    else if (cNum === 3) {
                        this.player.setImage('./assets/img/player-girl2-down.png');
                    }
                    else if (cNum === 4) {
                        this.player.setImage('./assets/img/player-girl1-down.png');
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
//# sourceMappingURL=Cafeteria.js.map