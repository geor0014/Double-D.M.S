import GameEntity from './GameEntity.js';
export default class Candy extends GameEntity {
    constructor(xPos, yPos) {
        super('./assets/img/candy.png', xPos, yPos);
        this.setImageHeight(10);
        this.setImageWidth(10);
    }
}
//# sourceMappingURL=Candy.js.map