class Particle {
  constructor() {
    this.markedForDeletion = false;
  }

  update() {
    this.x -= this.speedX;
    this.y += this.speedY;
    this.size *= 0.9; //higher number >> longer particle livespan
    if (this.size < 1) this.markedForDeletion = true;
  }
}

export class HitDust extends Particle {
  constructor(x, y, color) {
    super();

    this.color = color;
    this.size = Math.random() * 3 + 3;
    this.x = x;
    this.y = y;
    this.speedX = Math.random() < 0.5 ? -1 : 1;
    this.speedY = Math.random();
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    // full circle
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
