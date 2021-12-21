import GameEntity from './GameEntity.js';
export default class Candy extends GameEntity {
    constructor(x, y) {
        super('./assets/img/candy.png', x, y);
        this.setImageHeight(10);
        this.setImageWidth(10);
    }
}
//# sourceMappingURL=Candy.js.map