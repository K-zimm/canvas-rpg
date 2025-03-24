export class Vector2 {
  constructor(public x: number = 0, public y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public duplicate(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public stringify(): string {
    return `${this.x},${this.y}`;
  }
}
