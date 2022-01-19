import Door from './Door.js';
import Room from './Room.js';
import Candy from './Candy.js';
import Npc from './Npc.js';
import Dialog from './Dialog.js';
import ShadyDialog from './ShadyDialog.js';
export default class Bathroom1 extends Room {
    previousScene;
    shadyGuy;
    interactShady;
    constructor(canvas, previousScene, player, state) {
        super(canvas, './assets/img/bathroom1.png', state);
        this.previousScene = previousScene;
        this.player = player;
        this.setXPos(0);
        this.setYPos(0);
        this.interactShady = false;
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.shadyGuy = new Npc('./assets/img/ShadyGuySide.png', this.canvas.width / 2, 400, [
            new Dialog('Hey kid..#', ['What are you doing in the bathroom?', 'Hello??'], ['He..He..', 'You are braver than most..']),
            new Dialog('I heard its your birthday today..#', ['It is!', 'How did you know this?'], ['Happy Birthday...', 'I know EVERYTHING!']),
            new Dialog('I can give you some candy if you want#', ['Yay candy!', 'I dont want anything from you!'], ['hahaha', 'Why not I am pretty nice']),
            new Dialog('OR I can give you a PHONE!!#', ['Really?!', 'I shouldnt be talking to you'], ['Yes!', 'Come on I know you want the phone!']),
            new Dialog('What do you chose?#', ['The phone', 'Nothing..'], ['Here you go... Ill call you', 'Fine whatever..']),
        ]);
        this.collectibles.push(new Candy(this.canvas.width / 2, this.canvas.height / 2));
        this.doors.push(new Door('./assets/img/girl-bathroom-door.png', 912, 265));
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
                    this.player.setXPos(910);
                    this.player.setYPos(300);
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
            if (this.player.collidesWith(this.shadyGuy) && this.interactShady === false) {
                this.interactShady = true;
                return new ShadyDialog(this.canvas, this, this.shadyGuy.getDialogs(), this.player.getCharacterNum());
            }
        }
        if (nextScene !== null) {
            return nextScene;
        }
        return null;
    }
    render() {
        this.draw(this.ctx);
        this.shadyGuy.draw(this.ctx);
        super.render();
    }
}
//# sourceMappingURL=Bathroom1.js.map