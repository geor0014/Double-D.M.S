export default class Boss {
    bossImg;
    spriteWidth;
    spriteHeight;
    frameY = 0;
    constructor() {
        this.bossImg = new Image();
        this.bossImg.src = './assets/img/boss.png';
        this.spriteHeight = 83.7;
        this.spriteWidth = 133;
    }
    setFrameY(newFrame) {
        this.frameY = newFrame;
    }
    draw(ctx) {
        ctx.drawImage(this.bossImg, 0, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 503, 414, this.spriteWidth, this.spriteHeight);
    }
}
//# sourceMappingURL=Boss.js.map