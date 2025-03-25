import { events } from '../../engine/Events';
import { GameObject } from '../../engine/GameObject';
import { ImageResource, resources } from '../../engine/Resources';
import { Sprite } from '../../engine/Sprite';
import { Vector2 } from '../../engine/Vector2';

export class Inventory extends GameObject {
  public items: Array<{ id: number; image: ImageResource }>;
  public nextId: number;

  constructor() {
    super({
      position: new Vector2(0, 2)
    });
    this.nextId = 0;

    this.items = [
      {
        id: -1,
        image: resources.images.rod
      },
      {
        id: -2,
        image: resources.images.rod
      }
    ];

    events.on(
      'HERO_PICKS_UP_ITEM',
      this,
      (data: { image: ImageResource; position: Vector2; name: string }) => {
        this.nextId++;
        this.items.push({
          id: this.nextId,
          image: data.image
        });
        this.renderInventory();
      }
    );

    // Demo removing of something
    setTimeout(() => {
      this.removeFromInventory(-1);
    }, 2000);

    this.renderInventory();
  }

  renderInventory() {
    this.children.forEach((child) => child.destroy());

    this.items.forEach((item, index) => {
      const sprite = new Sprite({
        resource: item.image,
        position: new Vector2(index * 12, 0)
      });
      this.addChild(sprite);
    });
  }

  removeFromInventory(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
    this.renderInventory();
  }
}
