export default class Hitbox {
    x;
    y;
    width;
    height;
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    getXPos() {
        return this.x;
    }
    getYPos() {
        return this.y;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    draw(canvas) {
        const ctx2 = canvas.getContext('2d');
        ctx2.beginPath();
        ctx2.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx2.fillRect(this.x, this.y, this.width, this.height);
        ctx2.stroke();
    }
}
//# sourceMappingURL=Hitbox.js.map