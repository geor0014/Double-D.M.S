export default class Scene {
    game;
    canvas;
    ctx;
    constructor(game) {
        this.game = game;
        this.canvas = this.game.getCanvas();
        this.ctx = this.canvas.getContext('2d');
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'white') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=Scene.js.map