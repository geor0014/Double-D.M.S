import GameEntity from './GameEntity.js';
export default class Npc extends GameEntity {
    dialogs;
    questSign;
    starHeight = 97;
    starWdth = 100;
    frameX = 0;
    hasQuest;
    constructor(imageSrc, xPos, yPos, dialogs, hasQuest) {
        super(imageSrc, xPos, yPos);
        this.dialogs = dialogs;
        this.questSign = new Image();
        this.questSign.src = './assets/img/spinIconRount.png';
        this.hasQuest = hasQuest;
    }
    getDialogs() {
        return this.dialogs;
    }
    draw(ctx) {
        ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
        if (this.hasQuest === true) {
            this.drawStar(ctx, this.getXPos() + 5, this.getYPos() - 40);
        }
    }
    drawStar(ctx, x, y) {
        ctx.drawImage(this.questSign, this.frameX * this.starWdth, 0, this.starWdth, this.starHeight, x, y, this.starWdth - 65, this.starHeight - 65);
    }
    setFrameX(newFrame) {
        this.frameX = newFrame;
    }
}
//# sourceMappingURL=Npc.js.map