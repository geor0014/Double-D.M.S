export default class Question {
    questionText;
    rightAnswer;
    wrongAnswers = [];
    rAnsPosition;
    part1;
    part2;
    part3;
    constructor(qText, rAns, wAns1, wAns2) {
        this.questionText = qText;
        this.rightAnswer = rAns;
        this.wrongAnswers.push(wAns1, wAns2);
        this.rAnsPosition = Question.randomNumber(0, 2);
        this.part1 = '';
        this.part2 = '';
        this.part3 = '';
        this.splitQText();
    }
    splitQText() {
        let i = 0;
        const hCount = this.countHashTags();
        if (hCount === 0) {
            this.part1 = this.questionText;
        }
        for (let h = 0; h <= hCount; h += 1) {
            while (this.questionText[i] !== '#' && i < this.questionText.length) {
                if (h === 0) {
                    this.part1 += this.questionText[i];
                }
                else if (h === 1) {
                    this.part2 += this.questionText[i];
                }
                else if (h === 2) {
                    this.part3 += this.questionText[i];
                }
                i += 1;
            }
            i += 1;
        }
    }
    countHashTags() {
        let countH = 0;
        for (let i = 0; i < this.questionText.length; i += 1) {
            if (this.questionText[i] === '#') {
                countH += 1;
            }
        }
        console.log(`hashtag counter ${countH}`);
        return countH;
    }
    getRPos() {
        return this.rAnsPosition;
    }
    getQTxt(i) {
        if (i === 0) {
            return this.part1;
        }
        if (i === 1) {
            return this.part2;
        }
        return this.part3;
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