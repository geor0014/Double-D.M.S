export default class MainText {
  // text which should be displayed
  private text: string;

  // text part 1
  private part1: string;

  // text part 2
  private part2: string;

  // text part 3
  private part3: string;

  /**
   * Creating new Main Text
   *
   * @param text string
   */
  public constructor(text: string) {
    // sets the attributes
    this.text = text;
    this.part1 = '';
    this.part2 = '';
    this.part3 = '';
    this.splitText();
  }

  /**
   * Splits the text accroding to the # position
   */
  private splitText(): void {
    let i: number = 0;
    const hCount = this.countHashTags();
    if (hCount === 0) {
      this.part1 = this.text;
    }

    // splits the text when it hits a #
    for (let h = 0; h <= hCount; h += 1) {
      while (this.text[i] !== '#' && i < this.text.length) {
        if (h === 0) {
          this.part1 += this.text[i];
        } else if (h === 1) {
          this.part2 += this.text[i];
        } else if (h === 2) {
          this.part3 += this.text[i];
        }
        i += 1;
      }
      i += 1;
    }
  }

  /**
   * counts the number of # in the text
   *
   * @returns number of #
   */
  private countHashTags(): number {
    let countH: number = 0;
    for (let i = 0; i < this.text.length; i += 1) {
      if (this.text[i] === '#') {
        countH += 1;
      }
    }
    // console.log(`hashtag counter ${countH}`);
    return countH;
  }

  /**
   * Getter for the text
   *
   * @param i number of part that needs to be written
   * @returns text of the right part
   */
  public getText(i: number): string {
    if (i === 0) {
      return this.part1;
    }
    if (i === 1) {
      return this.part2;
    }
    return this.part3;
  }
}
