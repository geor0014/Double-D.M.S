import GameEntity from './GameEntity.js';
export default class Door1 extends GameEntity {
    constructor(xPos, yPos) {
        super('./assets/img/door1.png', xPos, yPos);
        this.setImageHeight(this.getImage().height + 40);
        this.setImageWidth(this.getImage().width + 15);
    }
}
//# sourceMappingURL=Door1.js.map