export default class Question {
    questionText;
    rightAnswer;
    wrongAnswer1;
    wrongAnswer2;
    rAnsPosition;
    constructor(qText, rAns, wAns1, wAns2) {
        this.questionText = qText;
        this.rightAnswer = rAns;
        this.wrongAnswer1 = wAns1;
        this.wrongAnswer2 = wAns2;
        this.rAnsPosition = Question.randomNumber(1, 3);
    }
    getRPos() {
        return this.rAnsPosition;
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=Question.js.map