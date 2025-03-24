import { Input } from './engine/Input';
import { resources } from './engine/Resources';
import { Sprite } from './engine/Sprites';
import { Vector2 } from './engine/Vector2';
import { GameLoop } from './GameLoop';
import { gridCells, isSpaceFree } from './helpers/grid';
import { moveTowards } from './helpers/moveTowards';
import { walls } from './levels/level1';
import './style.css';

const canvas = document.querySelector('#game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const gridSize = 16;

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180)
});

const heroStartPos = new Vector2(gridCells(6), gridCells(5));
const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
  position: heroStartPos,
  destination: heroStartPos.duplicate()
});

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32)
});

const input = new Input();

const draw = () => {
  if (!ctx) return;
  skySprite.drawImage(ctx, new Vector2(0, 0));
  groundSprite.drawImage(ctx, new Vector2(0, 0));

  const heroOffset = new Vector2(-8, -21);
  const heroPos = new Vector2(
    hero.position.x + heroOffset.x,
    hero.position.y + heroOffset.y
  );

  shadow.drawImage(ctx, heroPos);
  hero.drawImage(ctx, heroPos);
};

const update = (timeStep: number) => {
  const distance = moveTowards(hero, 1);
  const hasArrived = distance <= 1;
  if (hasArrived) {
    tryMove();
  }
};

const tryMove = () => {
  if (!input.direction) return;

  const nextPosition = hero.destination.duplicate();

  switch (input.direction) {
    case 'UP':
      nextPosition.y -= gridSize;
      hero.frame = 6;
      break;
    case 'DOWN':
      nextPosition.y += gridSize;
      hero.frame = 0;
      break;
    case 'LEFT':
      nextPosition.x -= gridSize;
      hero.frame = 9;
      break;
    case 'RIGHT':
      nextPosition.x += gridSize;
      hero.frame = 3;
      break;
  }

  // TODO: check if the next position is valid
  if (isSpaceFree(walls, nextPosition)) {
    hero.destination = nextPosition;
  }
};

// const hero = new Sprite({
//   resource: resources.images.hero,
//   frameSize: 32,
//   hFrames: 3,
//   vFrames: 8,
//   frame: 0,
//   position: { x: 0, y: 0 }
// });

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
