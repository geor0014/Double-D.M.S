import MainText from './MainText.js';
export default class Question extends MainText {
    rightAnswer;
    wrongAnswers = [];
    rAnsPosition;
    userData;
    constructor(userData, qText, rAns, wAns1, wAns2) {
        super(qText);
        this.userData = userData;
        this.rightAnswer = rAns;
        this.wrongAnswers.push(wAns1, wAns2);
        this.rAnsPosition = Question.randomNumber(0, 2);
    }
    getUserData() {
        return this.userData;
    }
    getRPos() {
        return this.rAnsPosition;
    }
    getRAns() {
        return this.rightAnswer;
    }
    getWAns(i) {
        return this.wrongAnswers[i];
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=Question.js.map