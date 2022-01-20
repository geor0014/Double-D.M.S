export default class UserData {
    hintAmount;
    candyAmount;
    img;
    score;
    hintNum;
    quests = [];
    questItems = [];
    constructor() {
        this.img = new Image();
        this.img.src = './assets/img/player-boy-up.png';
        this.hintAmount = 0;
        this.candyAmount = 0;
        this.score = 0;
        this.hintNum = 0;
    }
    getHintNum() {
        return this.hintNum;
    }
    setHintNum(num) {
        this.hintNum = num;
    }
    getScore() {
        return this.score;
    }
    setScore(num) {
        this.score = num;
    }
    getHintAmount() {
        return this.hintAmount;
    }
    getCandyAmount() {
        return this.candyAmount;
    }
    setHintAmount(number) {
        this.hintAmount = number;
    }
    setCandyAmount(number) {
        this.candyAmount = number;
    }
    getQuests() {
        return this.quests;
    }
    getQuestItems() {
        return this.questItems;
    }
}
//# sourceMappingURL=UserData.js.map