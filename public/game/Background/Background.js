class Layer {
  constructor(imgWidth, imgHeight, speedModifer, image) {
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.speedModifer = speedModifer;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }

  update() {
    if (this.y < this.imgHeight) {
      this.y += 0.5 * this.speedModifer;
    } else {
      this.y = 0;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.imgWidth, this.imgHeight);
    ctx.drawImage(
      this.image,
      this.x,
      this.y - this.imgHeight,
      this.imgWidth,
      this.imgHeight
    );
  }
}

export default class Background {
  constructor() {
    this.width = 830;
    this.height = 700;
    this.layer1image = backgroundImage;

    this.layer1 = new Layer(this.width, this.height, 1.5, this.layer1image);

    this.backgroundLayers = [this.layer1];
  }

  update() {
    // this.backgroundLayers.forEach((layer) => {
    //   layer.update();
    // });

    this.layer1.update();
  }

  draw(ctx) {
    //   this.backgroundLayers.forEach((layer) => layer.draw(ctx));
    this.layer1.draw(ctx);
  }
}
