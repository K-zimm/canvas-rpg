import { resources } from './engine/Resources';
import { Sprite } from './engine/Sprite';
import { Vector2 } from './engine/Vector2';
import { GameLoop } from './engine/GameLoop';
import { GameObject } from './engine/GameObject';
import { gridCells } from './helpers/grid';
import { Hero } from './objects/Hero/Hero';
import './style.css';
import { events } from './engine/Events';
import { Camera } from './engine/Camera';
import { Rod } from './objects/Rod/Rod';
import { Inventory } from './objects/Inventory/Inventory';

// Grabbing the canvas to draw to
const canvas = document.querySelector('#game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

// Establish the root scene
const mainScene = new GameObject({ position: new Vector2(0, 0) });

// Build up the scene by adding a sky, ground and hero
const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180)
});
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const camera = new Camera(hero.position);
mainScene.addChild(camera);

const rod = new Rod(gridCells(7), gridCells(6));
mainScene.addChild(rod);

const inventory = new Inventory();

// establish update and draw loops
const update = (delta: number) => {
  mainScene.stepEntry(delta, mainScene);
};

const draw = () => {
  if (!ctx) return;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  skySprite.draw(ctx, new Vector2(0, 0));

  // Save the curent canvas state
  ctx.save();

  // Offset by camera position
  ctx.translate(camera.position.x, camera.position.y);

  // Draw objects in the mounted scene
  mainScene.draw(ctx, new Vector2(0, 0));

  // Restore the canvas state
  ctx.restore();

  // Draw HUD
  inventory.draw(ctx, new Vector2(0, 0));
};

// Start the game!
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
