import GameEntity from './GameEntity.js';
export default class Door extends GameEntity {
    constructor(srcImage, xPos, yPos) {
        super(srcImage, xPos, yPos);
        this.setImageHeight(this.getImage().height + 40);
        this.setImageWidth(this.getImage().width + 15);
    }
}
//# sourceMappingURL=Door.js.map