export default class UserData {
    hintAmount;
    candyAmount;
    name;
    img;
    constructor() {
        this.name = 'Player';
        this.img = new Image();
        this.img.src = './assets/img/player-boy-up.png';
        this.hintAmount = 0;
        this.candyAmount = 0;
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