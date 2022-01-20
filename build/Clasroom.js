import Room from './Room.js';
import QuestionScreen from './QuestionScreen.js';
export default class ClassRoom extends Room {
    previousScene;
    computer;
    questions;
    pcInteract = false;
    getPreviousScene() {
        return this.previousScene;
    }
    getComputer() {
        return this.computer;
    }
    getQuestions() {
        return this.questions;
    }
    getPcInteract() {
        return this.pcInteract;
    }
    setPreviousScene(previousScene) {
        this.previousScene = previousScene;
    }
    setComputer(computer) {
        this.computer = computer;
    }
    setQuestions(questions) {
        this.questions = questions;
    }
    setPcInteract(pcInteract) {
        this.pcInteract = pcInteract;
    }
    constructor(canvas, previousScene, player, state) {
        super(canvas, './assets/img/classroom.png', state);
        this.previousScene = previousScene;
        this.player = player;
        this.setXPos(0);
        this.setYPos(0);
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.questions = [];
    }
    update(elapsed) {
        const nextScene = this.generalInteraction();
        if (this.player.isInteracting()) {
            if (this.player.collidesWith(this.computer)) {
                if (this.pcInteract === false) {
                    this.pcInteract = true;
                    return new QuestionScreen(this.canvas, this, this.questions);
                }
            }
        }
        if (nextScene !== null) {
            return nextScene;
        }
        return null;
    }
    render() {
        this.draw(this.ctx);
        this.computer.draw(this.ctx);
        super.render();
        this.drawHitBoxes();
        console.log(this.player.getXPos(), this.player.getYPos());
    }
}
//# sourceMappingURL=Clasroom.js.map