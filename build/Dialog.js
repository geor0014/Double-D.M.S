import MainText from './MainText.js';
export default class Dialog extends MainText {
    possibleAns;
    replies;
    constructor(dText, answers, replies) {
        super(dText);
        this.possibleAns = answers;
        this.replies = replies;
    }
}
//# sourceMappingURL=Dialog.js.map