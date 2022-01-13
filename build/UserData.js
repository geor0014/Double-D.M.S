export default class UserData {
    hintAmount;
    candyAmount;
    name;
    img;
    score;
    hintNum;
    constructor() {
        this.name = 'Player';
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
}
//# sourceMappingURL=UserData.js.map