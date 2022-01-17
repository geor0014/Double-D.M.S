import Collectibles from './collectibles.js';
export default class QuestItem extends Collectibles {
    name;
    constructor(name, src, xPos, yPos) {
        super(src, xPos, yPos);
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
//# sourceMappingURL=QuestItem.js.map