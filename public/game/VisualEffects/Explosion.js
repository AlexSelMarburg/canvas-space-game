const sfx = new Audio();
sfx.src = "assets/sfx/explosion.wav";

export default class Explosion {
  constructor(ctx, x, y, color, playSFX = true) {
    this.ctx = ctx;
    this.color = color;
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.scale = Math.random() * 0.3 + 0.5;
    this.width = this.spriteWidth * this.scale;
    this.height = this.spriteHeight * this.scale;
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
    this.image = new Image();
    this.image.src = "assets/img/explosion.png";
    this.maxFrames = 5;
    this.frame = 0;
    this.timer = 0;
    this.stagger = 5;
    this.angle = Math.random() * 6.2; //6.2 radiant = 360deg
    this.playSFX = playSFX;

    this.sound = sfx;
    this.sound.volume = 0.009;

    this.markedForDeletion = false;

    return this;
  }

  update() {
    if (this.frame === 0 && this.playSFX) {
      this.sound.play();
    }

    this.timer++;
    if (this.timer % this.stagger === 0) {
      this.frame++;
    }

    if (this.frame >= this.maxFrames) {
      this.markedForDeletion = true;
    }

    this.draw();
  }

  draw() {
    this.ctx.save();

    this.ctx.shadowBlur = 12;
    this.ctx.shadowColor = this.color;

    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.ctx.rotate(this.angle);

    this.ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);

    this.ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.ctx.restore();
  }
}
