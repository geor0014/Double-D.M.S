import Room from './Room.js';
import Door from './Door.js';
import ClassRoom1 from './Classroom1.js';
import ClassRoom2 from './Classroom2.js';
import ClassRoom3 from './Classroom3.js';
import Dialog from './Dialog.js';
import Npc from './Npc.js';
import Hint from './Hint.js';
import Bathroom1 from './Bathroom1.js';
import Bathroom2 from './Bathroom2.js';
export default class EasyHallway extends Room {
    mainHallway;
    room1Interact;
    room2Interact;
    room3Interact;
    bathroomInteractBoy;
    bathroomInteractGirl;
    class1;
    class2;
    class3;
    bathroom1;
    bathroom2;
    constructor(canvas, mainHallway, player) {
        super(canvas, './assets/img/easyHallway.png');
        console.log('creating easy hallway');
        this.room1Interact = false;
        this.room2Interact = false;
        this.room3Interact = false;
        this.bathroomInteractBoy = false;
        this.bathroomInteractGirl = false;
        this.mainHallway = mainHallway;
        this.player = player;
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.setXPos(0);
        this.setYPos(0);
        this.collectibles.push(new Hint(this.canvas.width / 3, this.canvas.height / 3));
        this.npcs.push(new Npc('./assets/img/student1BackFacing.png', 575, 495, [
            new Dialog('Hello, I lost my backpack....#', ['really?', 'oh no'], ['yes..', 'all my things are there']),
            new Dialog('Can you please look for it and bring it back to me tomorrow?#', ['Sure!', 'okay'], ['', '']),
        ]), new Npc('./assets/img/blackHairStudentLeftFacing.png', 195, 315, [
            new Dialog('There are some things you should never share!#', ['I know that', 'ok..'], ['Good!', 'I am scared']),
            new Dialog('I hope she will not be bullied#', ['Me too!', '...'], ['', '']),
        ]), new Npc('./assets/img/redHairStudentRightFacing.png', 155, 315, [
            new Dialog('Did you hear about Jessica?#', ['No..', 'What happaned?'], ['How not?', 'The picture!']),
            new Dialog('Cant believe she shared that picture :O#', ['Didnt see it', '...'], ['', '']),
        ]));
        this.doors.push(new Door('./assets/img/door1.png', 632, 228.5));
        this.doors.push(new Door('./assets/img/door1.png', 450, 228.5));
        this.doors.push(new Door('./assets/img/door1.png', 280, 228.5));
        this.doors.push(new Door('./assets/img/girlBathroomDoor.png', 910, 228.5));
        this.doors.push(new Door('./assets/img/boyBathroomDoor.png', 100, 228.5));
        this.insertHitbox(49, 245, 1000, 10, 1);
        this.insertHitbox(144, 548.5, 1000, 10, 1);
        this.insertHitbox(957, 304, 50, 10, 1);
        this.insertHitbox(65, 308.5, 30, 300, 1);
        this.insertHitbox(959, 451.5, 50, 40, 1);
        this.insertHitbox(144, 490.5, 97, 10, 1);
        this.insertHitbox(383, 490.5, 145.5, 10, 1);
        this.insertHitbox(669, 490.5, 194, 10, 1);
        this.insertHitbox(813, 307.5, 97, 10, 1);
        this.insertHitbox(390, 314.5, 30, 30, 1);
        this.insertHitbox(772, 314.5, 30, 30, 1);
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        const cNum = this.player.getCharacterNum();
        if (this.player.getXPos() >= 969 && this.player.getYPos() >= 309.5) {
            this.player.setXPos(163);
            this.player.setYPos(440);
            if (cNum === 1) {
                this.player.setImage('./assets/img/PlayerBoy1RIght.png');
            }
            else if (cNum === 2) {
                this.player.setImage('./assets/img/playerBoy2Right.png');
            }
            else if (cNum === 3) {
                this.player.setImage('./assets/img/playerGirl2Right.png');
            }
            else if (cNum === 4) {
                this.player.setImage('./assets/img/playerGirl1Right.png');
            }
            return this.mainHallway;
        }
        if (this.player.isInteracting()) {
            for (let i = 0; i < this.doors.length; i += 1) {
                if (this.player.collidesWith(this.doors[i])) {
                    console.log('interact with door');
                    this.player.setXPos(911);
                    this.player.setYPos(473);
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
                    this.doorOpen.play();
                    if (i === 0) {
                        if (this.room1Interact === false) {
                            this.class1 = new ClassRoom1(this.canvas, this, this.player, this.isMenuShowing);
                            this.room1Interact = true;
                        }
                        return this.class1;
                    }
                    if (i === 1) {
                        if (this.room2Interact === false) {
                            this.class2 = new ClassRoom2(this.canvas, this, this.player, this.isMenuShowing);
                            this.room2Interact = true;
                        }
                        return this.class2;
                    }
                    if (i === 2) {
                        if (this.room3Interact === false) {
                            this.class3 = new ClassRoom3(this.canvas, this, this.player, this.isMenuShowing);
                            this.room3Interact = true;
                        }
                        return this.class3;
                    }
                    if (i === 3) {
                        this.player.setXPos(911);
                        this.player.setYPos(350);
                        if (this.bathroomInteractGirl === false) {
                            this.bathroom1 = new Bathroom1(this.canvas, this, this.player, this.isMenuShowing);
                            this.bathroomInteractGirl = true;
                        }
                        return this.bathroom1;
                    }
                    if (i === 4) {
                        this.player.setXPos(911);
                        this.player.setYPos(350);
                        if (this.bathroomInteractBoy === false) {
                            this.bathroom2 = new Bathroom2(this.canvas, this, this.player, this.isMenuShowing);
                            this.bathroomInteractBoy = true;
                        }
                        return this.bathroom2;
                    }
                }
            }
        }
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
//# sourceMappingURL=EasyHallway.js.map