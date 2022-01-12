import GameEntity from './GameEntity.js';
export default class Npc extends GameEntity {
    dialogs;
    constructor(imageSrc, xPos, yPos, dialogs) {
        super(imageSrc, xPos, yPos);
        this.dialogs = dialogs;
    }
    getDialogs() {
        return this.dialogs;
    }
}
//# sourceMappingURL=Npc.js.map