import GameEntity from './GameEntity.js';
export default class Hint extends GameEntity {
    constructor(xPos, yPos) {
        super('./assets/img/hint.png', xPos, yPos);
        this.setImageHeight(20);
        this.setImageWidth(20);
    }
}
//# sourceMappingURL=Hint.js.map