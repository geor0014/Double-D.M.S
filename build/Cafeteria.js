import Door from './Door.js';
import Room from './Room.js';
import Candy from './Candy.js';
import Npc from './Npc.js';
import Dialog from './Dialog.js';
import HintBuyDialog from './HintBuyDialog.js';
export default class Cafeteria extends Room {
    previousScene;
    lunchLady;
    staggerFrame = 8;
    constructor(canvas, previousScene, player, state) {
        super(canvas, './assets/img/diningroom.png', state);
        this.previousScene = previousScene;
        this.player = player;
        this.setXPos(0);
        this.setYPos(0);
        this.setCollectibles([]);
        this.setNpcs([]);
        this.setDoors([]);
        this.getNpcs().push(new Npc('./assets/img/gingerGirl.png', 652, 436, [
            new Dialog('This is some delicious food they have here#', ['I know right!', 'I guess..'], ['I am excited for today', 'Happy bithday btw!']),
            new Dialog('I love french fries, how about you?#', ['Meh..', 'LOVE THEM'], ['oh shame..', 'I KNOW THEY ARE THE BEST']),
        ]), new Npc('./assets/img/greenGirl.png', 714, 298, [
            new Dialog('Hurry up, everyone, class starts in 10 minutes!!#', ['Dont feel like it..', 'Better go!'], ['', '']),
        ]));
        this.lunchLady = new Npc('./assets/img/lunchLady.png', 300, 500, [
            new Dialog('Good day!# we have some special treats today!#', ['ohh delicious', 'I am starving'], ['I hope so, I worked hard on this', 'You should eat something']),
            new Dialog('I can trade you some candy for hints#', ['Yes please', 'No thank you'], ['There you go', 'Okay maybe later']),
        ], true);
        this.getCollectibles().push(new Candy(this.canvas.width / 2, this.canvas.height / 3));
        this.getDoors().push(new Door('./assets/img/cafeteriaDoor.png', 907, 362));
        this.insertHitbox(955, 356.5, 10, 160, 1);
        this.insertHitbox(906, 563.5, 45, 100, 1);
        this.insertHitbox(428, 105.5, 600, 115, 1);
        this.insertHitbox(864, 274.5, 100, 30, 1);
        this.insertHitbox(139, 264.5, 330, 100, 1);
        this.insertHitbox(190, 413.5, 240, 100, 1);
        this.insertHitbox(164, 559.5, 30, 100, 1);
        this.insertHitbox(240, 660.5, 630, 10, 1);
        this.insertHitbox(243, 604.5, 140, 10, 1);
        this.insertHitbox(528, 513.5, 280, 100, 1);
        this.insertHitbox(522, 365.5, 290, 100, 1);
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        this.renderStars();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.getDoors().length; i += 1) {
                if (this.player.collidesWith(this.getDoors()[i])) {
                    this.getDoorClose().play();
                    this.player.setXPos(284);
                    this.player.setYPos(250);
                    const cNum = this.player.getCharacterNum();
                    if (cNum === 1) {
                        this.player.setImage('./assets/img/PlayerBoy1Down.png');
                    }
                    else if (cNum === 2) {
                        this.player.setImage('./assets/img/playerBoy2Down.png');
                    }
                    else if (cNum === 3) {
                        this.player.setImage('./assets/img/playerGirl2Down.png');
                    }
                    else if (cNum === 4) {
                        this.player.setImage('./assets/img/playerGirl1Down.png');
                    }
                    return this.previousScene;
                }
            }
            if (this.player.collidesWith(this.lunchLady)) {
                return new HintBuyDialog(this.canvas, this, this.lunchLady.getDialogs(), this.player.getUserData());
            }
        }
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
    renderStars() {
        this.setGameFrame(this.getGameFrame() + 1);
        if (this.getGameFrame() % this.staggerFrame === 0) {
            if (this.getFrameX() < 9) {
                this.setFrameX(this.getFrameX() + 1);
            }
            else {
                this.setFrameX(0);
            }
        }
        this.lunchLady.setFrameX(this.getFrameX());
    }
}
//# sourceMappingURL=Cafeteria.js.map