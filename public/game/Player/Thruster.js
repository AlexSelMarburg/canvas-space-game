export default class Thruster {
  constructor(position) {
    this.position = position;

    this.width = 12;
    this.height = 24;

    this.image = thrustImage;
    this.imageWidth = 128;
    this.imageHeight = 128;

    this.maxFrames = 23;
    this.frame = 0;
  }

  update(position) {
    this.position = position;

    if (this.frame < this.maxFrames) {
      this.frame++;
    } else {
      this.frame = 0;
    }

    this.x = this.position.x;
    this.y = this.position.y;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frame * this.imageWidth,
      0,
      this.imageWidth,
      this.imageHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
