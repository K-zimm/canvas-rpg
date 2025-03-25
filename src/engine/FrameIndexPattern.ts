export interface AnimationConfig {
  duration: number;
  frames: {
    time: number;
    frame: number;
  }[];
}

export class FrameIndexPattern {
  private animationConfig: AnimationConfig;
  private duration: number;
  public currentTime: number;

  constructor(animationConfig: AnimationConfig) {
    this.currentTime = 0;
    this.animationConfig = animationConfig;
    this.duration = animationConfig.duration;
  }

  get frame() {
    const { frames } = this.animationConfig;
    for (let i = frames.length - 1; i >= 0; i--) {
      const frame = frames[i];
      if (this.currentTime >= frame.time) {
        return frames[i].frame;
      }
    }
    throw 'Time is before the first keyframe';
  }

  step(delta: number) {
    this.currentTime += delta;
    if (this.currentTime > this.duration) {
      this.currentTime = 0;
    }
  }
}
