import Room from './Room.js';
import Door from './Door.js';
import ClassRoom4 from './Classroom4.js';
import ClassRoom5 from './Classroom5.js';
import ClassRoom6 from './Classroom6.js';
import HintScreen from './HintScreen.js';
import Hint from './Hint.js';
import Candy from './Candy.js';
import DialogScreen from './DialogScreen.js';
export default class DifficultHallway extends Room {
    mainHallway;
    constructor(canvas, mainHallway, player) {
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
        this.doors.push(new Door('./assets/img/door1.png', 332, 130));
        this.doors.push(new Door('./assets/img/door1.png', 532, 130));
        this.doors.push(new Door('./assets/img/door1.png', 732, 130));
    }
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.player.getXPos() <= 0 && this.player.getYPos() <= 433) {
            this.player.setXPos(1368);
            this.player.setYPos(371);
            this.player.setImage('./assets/img/player-boy-left.png');
            return this.mainHallway;
        }
        if (this.player.isReadingHint() &&
            this.player.getUserData().getHintAmount() > 0) {
            this.player
                .getUserData()
                .setHintAmount(this.player.getUserData().getHintAmount() - 1);
            console.log(this.player.getUserData().getHintAmount());
            return new HintScreen(this.canvas, this, 2);
        }
        if (this.player.isInteractingMenu()) {
            if (this.isMenuShowing === true) {
                this.isMenuShowing = false;
            }
            else if (this.isMenuShowing === false) {
                this.isMenuShowing = true;
            }
        }
        if (this.player.isInteracting()) {
            this.collectibles.forEach((item) => {
                if (this.player.collidesWith(item)) {
                    this.collectCollectibles();
                    if (item instanceof Candy) {
                        this.player
                            .getUserData()
                            .setCandyAmount(this.player.getUserData().getCandyAmount() + 1);
                        console.log(this.player.getUserData().getCandyAmount());
                    }
                    else if (item instanceof Hint) {
                        this.player
                            .getUserData()
                            .setHintAmount(this.player.getUserData().getHintAmount() + 1);
                        console.log(this.player.getUserData().getHintAmount());
                    }
                }
            });
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.doorOpen.play();
                    if (i === 0) {
                        return new ClassRoom4(this.canvas, this, this.player);
                    }
                    if (i === 1) {
                        return new ClassRoom5(this.canvas, this, this.player);
                    }
                    if (i === 2) {
                        return new ClassRoom6(this.canvas, this, this.player);
                    }
                }
            }
            for (let i = 0; i < this.npcs.length; i += 1) {
                if (this.player.collidesWith(this.npcs[i])) {
                    console.log('interact with npc');
                    this.player.setXPos(this.player.getXPos() - 50);
                    this.player.setYPos(this.player.getYPos() + 50);
                    return new DialogScreen(this.canvas, this);
                }
            }
        }
        return null;
    }
    render() {
        this.draw(this.ctx);
        super.render();
    }
}
//# sourceMappingURL=DifficultHallway.js.map