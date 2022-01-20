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
    shadyGuyTheme;
    constructor(canvas, previousScene, player) {
        super(canvas, './assets/img/bathroom1.png');
        this.previousScene = previousScene;
        this.player = player;
        this.setXPos(0);
        this.setYPos(0);
        this.interactShady = false;
        this.setCollectibles([]);
        this.setNpcs([]);
        this.setDoors([]);
        this.shadyGuy = new Npc('./assets/img/ShadyGuySide.png', this.canvas.width / 2, 400, [
            new Dialog('Hey kid..#', ['What are you doing in the bathroom?', 'Hello??'], ['He..He..', 'You are braver than most..']),
            new Dialog('I heard its your birthday today..#', ['It is!', 'How did you know this?'], ['Happy Birthday...', 'I know EVERYTHING!']),
            new Dialog('I can give you some candy if you want#', ['Yay candy!', 'I dont want anything from you!'], ['hahaha', 'Why not I am pretty nice']),
            new Dialog('OR I can give you a PHONE!!#', ['Really?!', 'I shouldnt be talking to you'], ['Yes!', 'Come on I know you want the phone!']),
            new Dialog('What do you chose?#', ['The phone', 'Nothing..'], ['Here you go... Ill call you', 'Fine whatever..']),
        ]);
        this.getCollectibles().push(new Candy(this.canvas.width / 2, this.canvas.height / 2));
        this.getDoors().push(new Door('./assets/img/girlBathroomDoor.png', 912, 265));
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
        this.shadyGuyTheme = new Audio('./assets/sound/shady.mp3');
        this.shadyGuyTheme.volume = 0.2;
        setTimeout(() => this.shadyGuyTheme.play(), 100);
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.getDoors().length; i += 1) {
                if (this.player.collidesWith(this.getDoors()[i])) {
                    this.getDoorClose().play();
                    this.player.setXPos(910);
                    this.player.setYPos(300);
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
                    this.shadyGuyTheme.pause();
                    return this.previousScene;
                }
            }
            if (this.player.collidesWith(this.shadyGuy) &&
                this.interactShady === false) {
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
        this.drawHitBoxes();
    }
}
//# sourceMappingURL=Bathroom1.js.map