import Screen from './Screen.js';
import KeyListener from './KeyListener.js';
export default class InteractiveScreen extends Screen {
    keyboard;
    previousScene;
    nextText;
    tCounter;
    frameCounter = 0;
    okPressed;
    textToPresent;
    constructor(canvas, previousScene, imgSrc) {
        super(canvas, imgSrc);
        this.keyboard = new KeyListener();
        this.previousScene = previousScene;
        this.nextText = false;
        this.tCounter = 0;
        this.okPressed = false;
        this.setXPos(0);
        this.setYPos(0);
    }
    processInput() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_ESC)) {
            return true;
        }
        return false;
    }
    moveBetweenInteractions() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)) {
            console.log('right pressed');
            this.nextText = true;
        }
        else {
            this.nextText = false;
        }
    }
    reciveAnswer() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_1)) {
            this.okPressed = true;
            return 1;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_2)) {
            this.okPressed = true;
            return 2;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_3)) {
            this.okPressed = true;
            return 3;
        }
        return 0;
    }
    draw(ctx) {
        ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
    }
    getTextToPresent() {
        return this.textToPresent;
    }
    setTextToPresent(text) {
        this.textToPresent = text;
    }
    getPreviousScene() {
        return this.previousScene;
    }
    setPreviousScene(room) {
        this.previousScene = room;
    }
    getNextText() {
        return this.nextText;
    }
    setNextText(next) {
        this.nextText = next;
    }
    getTCounter() {
        return this.tCounter;
    }
    setTCounter(counter) {
        this.tCounter = counter;
    }
    getFrameCounter() {
        return this.frameCounter;
    }
    setFrameCounter(counter) {
        this.frameCounter = counter;
    }
    getOkPressed() {
        return this.okPressed;
    }
    setOkPressed(press) {
        this.okPressed = press;
    }
}
//# sourceMappingURL=InteractiveScreen.js.map