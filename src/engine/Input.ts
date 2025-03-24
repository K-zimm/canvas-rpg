export const UP = 'UP';
export const DOWN = 'DOWN';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';

export class Input {
  private heldDirections: string[];

  constructor() {
    this.heldDirections = [];

    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.onArrowPressed(UP);
          break;
        case 'ArrowDown':
        case 'KeyS':
          this.onArrowPressed(DOWN);
          break;
        case 'ArrowLeft':
        case 'KeyA':
          this.onArrowPressed(LEFT);
          break;
        case 'ArrowRight':
        case 'KeyD':
          this.onArrowPressed(RIGHT);
          break;
      }
    });
    document.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.onArrowReleased(UP);
          break;
        case 'ArrowDown':
        case 'KeyS':
          this.onArrowReleased(DOWN);
          break;
        case 'ArrowLeft':
        case 'KeyA':
          this.onArrowReleased(LEFT);
          break;
        case 'ArrowRight':
        case 'KeyD':
          this.onArrowReleased(RIGHT);
          break;
      }
    });
  }

  private onArrowPressed(direction: string) {
    if (this.heldDirections.indexOf(direction) === -1) {
      this.heldDirections.unshift(direction);
    }
  }

  private onArrowReleased(direction: string) {
    const index = this.heldDirections.indexOf(direction);
    if (index > -1) {
      this.heldDirections.splice(index, 1);
    }
  }

  get direction() {
    return this.heldDirections[0];
  }
}
