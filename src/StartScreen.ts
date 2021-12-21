import Scene from './Scene.js';
import Level from './Level.js';
import KeyListener from './KeyListener.js';
import Game from './Game.js';

export default class Start extends Scene {
  private keyListener: KeyListener;

  private progressToNextScene: boolean;

  constructor(game: Game) {
    super(game);
    this.progressToNextScene = false;
    this.keyListener = new KeyListener();
  }

  public processInput(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
      this.progressToNextScene = true;
    }
  }

  public update(elapsed: number): Scene {
    if (this.progressToNextScene) {
      return new Level(this.game);
    }
    return null;
  }

  public render(): void {
    this.writeTextToCanvas('SuperCleaner!', 100, this.canvas.width / 2, this.canvas.height / 2 - 100, 'center', 'red');
    this.writeTextToCanvas('Press S to Start', 24, this.canvas.width / 2, this.canvas.height - 50);
  }
}
