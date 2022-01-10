export default class Question {
    questionText;
    rightAnswer;
    wrongAnswers = [];
    rAnsPosition;
    constructor(qText, rAns, wAns1, wAns2) {
        this.questionText = qText;
        this.rightAnswer = rAns;
        this.wrongAnswers.push(wAns1, wAns2);
        this.rAnsPosition = Question.randomNumber(0, 2);
    }
    getRPos() {
        return this.rAnsPosition;
    }
    getQTxt() {
        return this.questionText;
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