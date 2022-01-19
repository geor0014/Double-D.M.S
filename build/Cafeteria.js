import Door from './Door.js';
import Room from './Room.js';
import Candy from './Candy.js';
import Npc from './Npc.js';
import Dialog from './Dialog.js';
import HintBuyDialog from './HintBuyDialog.js';
export default class Cafeteria extends Room {
    previousScene;
    lunchLady;
    constructor(canvas, previousScene, player, state) {
        super(canvas, './assets/img/diningroom.png', state);
        this.previousScene = previousScene;
        this.player = player;
        this.setXPos(0);
        this.setYPos(0);
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.npcs.push(new Npc('./assets/img/ginger-girl.png', 652, 436, [
            new Dialog('This is some delicious food they have here#', ['I know right!', 'I guess..'], ['I am excited for today', 'Happy bithday btw!']),
            new Dialog('I love french fries, how about you?#', ['Meh..', 'LOVE THEM'], ['oh shame..', 'I KNOW THEY ARE THE BEST']),
        ]), new Npc('./assets/img/green-girl.png', 714, 298, [
            new Dialog('Hurry up, everyone, class starts in 10 minutes!!#', ['Dont feel like it..', 'Better go!'], ['', '']),
        ]));
        this.lunchLady = new Npc('./assets/img/lunch-lady.png', 300, 500, [
            new Dialog('Good day!# we have some special treats today!#', ['ohh delicious', 'I am starving'], ['I hope so, I worked hard on this', 'You should eat something']),
            new Dialog('I can trade you some candy for hints#', ['Yes please', 'No thank you'], ['There you go', 'Okay maybe later']),
        ]);
        this.collectibles.push(new Candy(this.canvas.width / 2, this.canvas.height / 2));
        this.doors.push(new Door('./assets/img/cafeteria-door.png', 907, 362));
<<<<<<< HEAD
        this.insertHitbox(955, 356.5, 10, 160);
        this.insertHitbox(906, 563.5, 45, 100);
        this.insertHitbox(428, 105.5, 600, 115);
        this.insertHitbox(864, 274.5, 100, 30);
        this.insertHitbox(139, 264.5, 330, 100);
        this.insertHitbox(190, 413.5, 240, 100);
        this.insertHitbox(164, 559.5, 30, 100);
        this.insertHitbox(240, 660.5, 630, 10);
        this.insertHitbox(243, 604.5, 140, 10);
        this.insertHitbox(528, 513.5, 280, 100);
        this.insertHitbox(522, 365.5, 290, 100);
=======
        this.insertHitbox(10, 10, 10, 10, 1);
>>>>>>> b6ad603b955bfafe61db3d37233eab51ed4efb43
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.doorClose.play();
                    console.log(this.previousScene);
                    this.player.setXPos(284);
                    this.player.setYPos(250);
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
            if (this.player.collidesWith(this.lunchLady)) {
                return new HintBuyDialog(this.canvas, this, this.lunchLady.getDialogs(), this.player.getUserData());
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
        this.lunchLady.draw(this.ctx);
        super.render();
        this.drawHitBoxes();
    }
}
//# sourceMappingURL=Cafeteria.js.map