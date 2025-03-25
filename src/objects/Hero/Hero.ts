import { Animations } from '../../engine/Animations';
import { DOWN, LEFT, RIGHT, UP } from '../../engine/Input';
import { Sprite } from '../../engine/Sprite';
import { Vector2 } from '../../engine/Vector2';
import { FrameIndexPattern } from '../../engine/FrameIndexPattern';
import { GameObject } from '../../engine/GameObject';
import { gridCells, isSpaceFree } from '../../helpers/grid';
import { walls } from '../../levels/level1';
import { moveTowards } from '../../helpers/moveTowards';
import {
  PICK_UP_DOWN,
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP
} from './heroAnimations';
import { ImageResource, resources } from '../../engine/Resources';
import { events } from '../../engine/Events';

export class Hero extends GameObject {
  public facingDirection: string;
  public destinationPosition: Vector2;
  public body: Sprite;
  private lastPostion: Vector2;
  private itemPickupTime: number;
  private itemPickupShell: GameObject | null;

  constructor(x: number, y: number) {
    super({ position: new Vector2(x, y) });

    const shadow = new Sprite({
      resource: resources.images.shadow,
      position: new Vector2(-8, -19),
      frameSize: new Vector2(32, 32)
    });
    this.addChild(shadow);

    this.body = new Sprite({
      resource: resources.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      position: new Vector2(-8, -20),
      animations: new Animations({
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standRight: new FrameIndexPattern(STAND_RIGHT),
        pickUpDown: new FrameIndexPattern(PICK_UP_DOWN)
      })
    });
    this.addChild(this.body);

    this.facingDirection = DOWN;
    this.destinationPosition = this.position.duplicate();
    this.lastPostion = this.position.duplicate();
    this.itemPickupTime = 0;
    this.itemPickupShell = null;

    events.on(
      'HERO_PICKS_UP_ITEM',
      this,
      (data: { image: ImageResource; position: Vector2; name: string }) => {
        this.onItemPickup(data);
      }
    );
  }

  step(delta: number, root: GameObject) {
    if (this.itemPickupTime > 0) {
      this.workOnItemPickup(delta);
      return;
    }

    const distance = moveTowards(this, this.destinationPosition, 1);
    const hasArrived = distance <= 1;
    if (hasArrived) {
      this.tryMove(root);
    }

    this.tryEmitPosition();
  }

  tryEmitPosition() {
    if (this.lastPostion.stringify() === this.position.stringify()) return;
    this.lastPostion = this.position.duplicate();
    events.emit('HERO_POSITION', this.position);
  }

  tryMove(root: GameObject) {
    const { input } = root;

    if (!input.direction) {
      switch (this.facingDirection) {
        case DOWN:
          this.body.animations?.play('standDown');
          break;
        case UP:
          this.body.animations?.play('standUp');
          break;
        case LEFT:
          this.body.animations?.play('standLeft');
          break;
        case RIGHT:
          this.body.animations?.play('standRight');
          break;
        default:
          this.body.animations?.play('standDown');
          break;
      }
    }

    const nextPosition = this.destinationPosition.duplicate();
    const gridSize = 16;

    switch (input.direction) {
      case 'UP':
        nextPosition.y -= gridSize;
        this.body.animations?.play('walkUp');
        break;
      case 'DOWN':
        nextPosition.y += gridSize;
        this.body.animations?.play('walkDown');
        break;
      case 'LEFT':
        nextPosition.x -= gridSize;
        this.body.animations?.play('walkLeft');
        break;
      case 'RIGHT':
        nextPosition.x += gridSize;
        this.body.animations?.play('walkRight');
        break;
    }

    this.facingDirection = input.direction ?? this.facingDirection;

    // TODO: add remaining walls
    if (isSpaceFree(walls, nextPosition)) {
      this.destinationPosition = nextPosition;
    }
  }

  onItemPickup({
    image,
    position,
    name
  }: {
    image: ImageResource;
    position: Vector2;
    name: string;
  }) {
    this.destinationPosition = position.duplicate();

    this.itemPickupTime = 500;
    this.itemPickupShell = new GameObject({});
    this.itemPickupShell.addChild(
      new Sprite({ resource: image, position: new Vector2(0, -18) })
    );
    this.addChild(this.itemPickupShell);
  }

  workOnItemPickup(delta: number) {
    this.itemPickupTime -= delta;
    this.body.animations?.play('pickUpDown');

    if (this.itemPickupTime <= 0) {
      this.itemPickupShell?.destroy();
      this.itemPickupShell = null;
    }
  }
}
