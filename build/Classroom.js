import Room from './Room.js';
export default class Classroom extends Room {
    previousScene;
    computer;
    questions;
    pcInteract = false;
    constructor(canvas, previousScene, player, state, imageSrc) {
        super(canvas, imageSrc);
        this.previousScene = previousScene;
        this.player = player;
        this.setXPos(0);
        this.setYPos(0);
        this.collectibles = [];
        this.npcs = [];
        this.doors = [];
        this.questions = [];
    }
    render() {
        this.draw(this.ctx);
        this.computer.draw(this.ctx);
        super.render();
        this.drawHitBoxes();
        console.log(this.player.getXPos(), this.player.getYPos());
    }
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
}
//# sourceMappingURL=Classroom.js.map