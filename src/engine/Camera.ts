import { events } from './Events';
import { GameObject } from './GameObject';
import { Vector2 } from './Vector2';

export class Camera extends GameObject {
  constructor(initialPosition: Vector2 = new Vector2(0, 0)) {
    const objectHalf = 8;
    const canvasWidth = 320;
    const canvasHeight = 180;
    const halfWidth = -objectHalf + canvasWidth / 2;
    const halfHeight = -objectHalf + canvasHeight / 2;

    super({});
    this.position = new Vector2(
      -initialPosition.x + halfWidth,
      -initialPosition.y + halfHeight
    );

    events.on('HERO_POSITION', this, (objectPosition) => {
      this.position = new Vector2(
        -objectPosition.x + halfWidth,
        -objectPosition.y + halfHeight
      );
    });
  }
}
