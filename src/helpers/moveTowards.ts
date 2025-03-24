import { Sprite } from '../engine/Sprites';

export const moveTowards = (sprite: Sprite, speed: number) => {
  let distance = 0;

  let distanceToX = sprite.destination.x - sprite.position.x;
  let distanceToY = sprite.destination.y - sprite.position.y;

  distance = Math.sqrt(distanceToX ** 2 + distanceToY ** 2);

  if (distance <= speed) {
    sprite.position.x = sprite.destination.x;
    sprite.position.y = sprite.destination.y;
  } else {
    const normalizeX = distanceToX / distance;
    const normalizeY = distanceToY / distance;

    sprite.position.x += normalizeX * speed;
    sprite.position.y += normalizeY * speed;

    distanceToX = sprite.destination.x - sprite.position.x;
    distanceToY = sprite.destination.y - sprite.position.y;
    distance = Math.sqrt(distanceToX ** 2 + distanceToY ** 2);
  }

  return distance;
};
