import { Vector2 } from '../engine/Vector2';

export const gridCells = (n: number) => {
  return n * 16;
};

export const isSpaceFree = (walls: Set<string>, tile: Vector2) => {
  // Check walls string set if the target tile is present
  const isWallPresent = walls.has(tile.stringify());
  return !isWallPresent;
};
