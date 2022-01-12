export default class MainText {
    text;
    part1;
    part2;
    part3;
    constructor(text) {
        this.text = text;
        this.part1 = '';
        this.part2 = '';
        this.part3 = '';
        this.splitText();
    }
    splitText() {
        let i = 0;
        const hCount = this.countHashTags();
        if (hCount === 0) {
            this.part1 = this.text;
        }
        for (let h = 0; h <= hCount; h += 1) {
            while (this.text[i] !== '#' && i < this.text.length) {
                if (h === 0) {
                    this.part1 += this.text[i];
                }
                else if (h === 1) {
                    this.part2 += this.text[i];
                }
                else if (h === 2) {
                    this.part3 += this.text[i];
                }
                i += 1;
            }
            i += 1;
        }
    }
    countHashTags() {
        let countH = 0;
        for (let i = 0; i < this.text.length; i += 1) {
            if (this.text[i] === '#') {
                countH += 1;
            }
        }
        return countH;
    }
    getText(i) {
        if (i === 0) {
            return this.part1;
        }
        if (i === 1) {
            return this.part2;
        }
        return this.part3;
    }
}
//# sourceMappingURL=MainText.js.map