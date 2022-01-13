import Scene from './Scene.js';
import Screen from './Screen.js';
import Room from './Room.js';
import KeyListener from './KeyListener.js';
import HintText from './hintText.js';

export default class HintScreen extends Screen {
  private previousScene: Room;

  private hintNum: number = 0;

  private hints: HintText[];

  private keyboard: KeyListener;

  private textToShow: string;

  constructor(
    canvas: HTMLCanvasElement,
    previousSceen: Room,
    hintNum: number
  ) {
    super(canvas, './assets/img/hint-screen.png');
    this.previousScene = previousSceen;

    this.keyboard = new KeyListener();

    this.setXPos(0);
    this.setYPos(0);

    this.hintNum = hintNum;
    this.hints = [
      new HintText('It`s very important that you never agree to get together with someone you# "met"online without first checking with your parents.# it should also be in a public place and with a parent present.'),
      new HintText('You must always keep your password a secret.# NEVER give it to anyone else or ask for their password.# If you do that, someone could steal your identity.'),
      new HintText('Be careful with who you talk to # not all people are who they say they are#'),
      new HintText('Never click sospicious links without making sure who sent them and why,# always ask a parent for help#'),
      new HintText('Watch what you share online!# some private information can be used against you,# and once its online its there forever'),
      new HintText('Cyber bullying is a very mean act,# be watchful what you do and say online to not hurt anybody`s feellings#'),
      new HintText('Dont accept friend requests from strangers!'),
      new HintText('No more hints available'),
    ];
  }

  public processInput(): boolean {
    if (this.keyboard.isKeyDown(KeyListener.KEY_ESC)) {
      return true;
    }
    return false;
  }

  public update(elapsed: number): Scene {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.processInput()) {
      return this.previousScene;
    }

    return null;
  }

  public render(): void {
    let textHPos: number = this.canvas.height / 3;
    const textWPos: number = this.canvas.width / 2;
    this.draw(this.ctx);
    for (let i = 0; i < 3; i += 1) {
      this.textToShow = this.hints[this.hintNum].getText(i);
      // console.log(textToWrite);
      this.writeTextToCanvas(
        this.textToShow,
        18,
        textWPos,
        textHPos,
        'center',
        'black'
      );
      textHPos += 50;
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
  }
}
