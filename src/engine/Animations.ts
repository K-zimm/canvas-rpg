import { FrameIndexPattern } from './FrameIndexPattern';

export class Animations {
  private patterns: Record<string, FrameIndexPattern>;
  private activeKey: string;

  constructor(patterns: Record<string, FrameIndexPattern>) {
    this.patterns = patterns;
    this.activeKey = Object.keys(this.patterns)[0];
  }

  get frame() {
    return this.patterns[this.activeKey].frame;
  }

  play(key: string, startAtTime: number = 0) {
    if (this.activeKey === key) return;

    this.activeKey = key;
    this.patterns[this.activeKey].currentTime = startAtTime;
  }

  step(delta: number) {
    this.patterns[this.activeKey].step(delta);
  }
}
