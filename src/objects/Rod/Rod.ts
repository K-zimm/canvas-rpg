import { events } from '../../engine/Events';
import { GameObject } from '../../engine/GameObject';
import { resources } from '../../engine/Resources';
import { Sprite } from '../../engine/Sprite';
import { Vector2 } from '../../engine/Vector2';

export class Rod extends GameObject {
  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y)
    });

    const sprite = new Sprite({
      resource: resources.images.rod,
      position: new Vector2(0, -5)
    });
    this.addChild(sprite);
  }

  ready() {
    events.on('HERO_POSITION', this, (heroPosition) => {
      // detect overlap..
      const roundedPosX = Math.round(heroPosition.x);
      const roundedPosY = Math.round(heroPosition.y);

      if (roundedPosX === this.position.x && roundedPosY === this.position.y) {
        // rod is in the same position as the hero
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero() {
    // Remove this instance from the scene
    this.destroy();

    // Alert other things that we picked up a rod
    events.emit('HERO_PICKS_UP_ITEM', {
      image: resources.images.rod,
      position: this.position,
      name: 'Rod'
    });
  }
}
