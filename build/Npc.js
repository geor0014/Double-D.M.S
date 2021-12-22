import GameEntity from './GameEntity.js';
export default class Npc extends GameEntity {
    constructor(imageSrc, xPos, yPos) {
        super(imageSrc, xPos, yPos);
        this.setImageHeight(44);
        this.setImageWidth(31);
    }
}
//# sourceMappingURL=Npc.js.map