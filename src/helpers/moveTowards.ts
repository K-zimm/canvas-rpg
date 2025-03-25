import { Vector2 } from '../engine/Vector2';
import { GameObject } from '../engine/GameObject';

export const moveTowards = (
  gameObject: GameObject,
  destination: Vector2,
  speed: number
) => {
  let distance = 0;

  let distanceToX = destination.x - gameObject.position.x;
  let distanceToY = destination.y - gameObject.position.y;

  distance = Math.sqrt(distanceToX ** 2 + distanceToY ** 2);

  if (distance <= speed) {
    gameObject.position.x = destination.x;
    gameObject.position.y = destination.y;
  } else {
    const normalizeX = distanceToX / distance;
    const normalizeY = distanceToY / distance;

    gameObject.position.x += normalizeX * speed;
    gameObject.position.y += normalizeY * speed;

    distanceToX = destination.x - gameObject.position.x;
    distanceToY = destination.y - gameObject.position.y;
    distance = Math.sqrt(distanceToX ** 2 + distanceToY ** 2);
  }

  return distance;
};
