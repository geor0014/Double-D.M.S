export default class MainText {
  private text: string;

  private part1: string;

  private part2: string;

  private part3: string;

  constructor(text: string) {
    this.text = text;
    this.part1 = '';
    this.part2 = '';
    this.part3 = '';
    this.splitText();
  }

  private splitText(): void {
    let i: number = 0;
    const hCount = this.countHashTags();
    if (hCount === 0) {
      this.part1 = this.text;
    }

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
