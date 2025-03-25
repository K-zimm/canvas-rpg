export class GameLoop {
  private timeStep: number = 1000 / 60;

  private update: (timeStep: number) => void;
  private render: () => void;
  private lastFrameTime: number;
  private accumulatedTime: number;
  private rafid: number | null;
  private isRunning: boolean;

  constructor(update: (timeStep: number) => void, render: () => void) {
    this.lastFrameTime = 0;
    this.accumulatedTime = 0;

    this.update = update;
    this.render = render;

    this.rafid = null;
    this.isRunning = false;
  }

  public mainLoop = (timeStamp: number) => {
    if (!this.isRunning) return;

    let deltaTime = timeStamp - this.lastFrameTime;
    this.lastFrameTime = timeStamp;
    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }

    this.render();
    this.rafid = requestAnimationFrame(this.mainLoop);
  };

  public start = () => {
    if (this.isRunning) return;
    this.isRunning = true;
    this.rafid = requestAnimationFrame(this.mainLoop);
  };

  public stop = () => {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.rafid) cancelAnimationFrame(this.rafid);
  };
}
