import { events } from './Events';
import { Input } from './Input';
import { Vector2 } from './Vector2';

interface GameObjectOptions {
  position?: Vector2;
}

export class GameObject {
  public position: Vector2;
  public children: GameObject[];
  public input: Input;
  public parent: GameObject | null;
  public hasReadyBeenCalled: boolean;

  constructor({ position }: GameObjectOptions) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
    this.parent = null;
    this.input = new Input();
    this.hasReadyBeenCalled = false;
  }

  // First entry point of the loop
  stepEntry(delta: number, root: any) {
    // Call updates on all children first
    this.children.forEach((child) => child.stepEntry(delta, root));

    // Call ready on the first frame
    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    // Call on implemented step code
    this.step(delta, root);
  }

  // Called before the first 'step'
  ready() {
    // ...
  }

  // Called once every frame
  step(_delta: number, root: any) {
    // ...
  }

  // Draw Entry
  draw(ctx: CanvasRenderingContext2D, position: Vector2) {
    const drawPosition = new Vector2(
      this.position.x + position.x,
      this.position.y + position.y
    );

    // do the actual rendering for Images
    this.drawImage(ctx, drawPosition);

    // Pass on to children
    this.children.forEach((child) => child.draw(ctx, drawPosition));
  }

  drawImage(ctx: CanvasRenderingContext2D, position: Vector2) {
    // ...
  }

  // Remove from the tree
  destroy() {
    this.children.forEach((child) => child.destroy());
    this.parent?.removeChild(this);
  }

  addChild(gameObject: GameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    events.unsubscribe(gameObject);
    this.children = this.children.filter((child) => child !== gameObject);
  }
}
