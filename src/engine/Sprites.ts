import type { ImageResource } from './Resources';
import { Vector2 } from './Vector2';

interface SpriteOptions {
  resource: ImageResource; // Image we want to load
  frameSize: Vector2; // size of the crop of the image
  hFrames?: number; // number of frames in the horizontal direction
  vFrames?: number; // number of frames in the vertical direction
  frame?: number; // frame we want to display
  scale?: number; // scale of the image
  position?: Vector2; // position of the image
  destination?: Vector2; // destination of the image
}

export class Sprite {
  public resource: ImageResource;
  public frameSize: Vector2;
  public hFrames: number;
  public vFrames: number;
  public frame: number;
  public scale: number;
  public position: Vector2;
  public destination: Vector2;
  private frameMap: Map<number, { x: number; y: number }>;

  constructor({
    resource,
    frameSize,
    hFrames,
    vFrames,
    frame,
    scale,
    position,
    destination
  }: SpriteOptions) {
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2();
    this.destination = destination ?? new Vector2();

    this.frameMap = new Map();
    this.buildFrameMap();
  }

  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(h * this.frameSize.x, v * this.frameSize.y)
        );
        frameCount++;
      }
    }
  }

  drawImage(ctx: CanvasRenderingContext2D, position: Vector2) {
    if (!this.resource.isLoaded) return;

    let frameCoordX = 0;
    let frameCoordY = 0;
    const frameCoord = this.frameMap.get(this.frame);
    if (frameCoord) {
      frameCoordX = frameCoord.x;
      frameCoordY = frameCoord.y;
    }

    ctx.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordY, // Top y corner of the frame
      this.frameSize.x, // How much to crop from the sprite sheet (X)
      this.frameSize.y, // How much to crop form the sprite sheet (Y)
      position.x, // X position on the canvas
      position.y, // Y position on the canvas,
      this.frameSize.x * this.scale, // Width of the image on the canvas
      this.frameSize.y * this.scale // Height of the image on the canvas
    );
  }
}
