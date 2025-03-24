export type ImageResource = {
  image: HTMLImageElement;
  isLoaded: boolean;
};

class Resources {
  private toLoad: { [key: string]: string };
  public images: {
    [key: string]: ImageResource;
  };

  constructor() {
    this.toLoad = {
      sky: '/sprites/sky.png',
      ground: '/sprites/ground.png',
      shadow: '/sprites/shadow.png',
      hero: '/sprites/hero-sheet.png'
    };
    this.images = {};

    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key];
      this.images[key] = {
        image: img,
        isLoaded: false
      };
      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const resources = new Resources();
