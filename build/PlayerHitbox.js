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
    draw(canvas) {
        const ctx2 = canvas.getContext('2d');
        ctx2.beginPath();
        ctx2.fillStyle = 'red';
        ctx2.fillRect(this.x, this.y, this.width, this.height);
        ctx2.stroke();
    }
}
//# sourceMappingURL=PlayerHitbox.js.map