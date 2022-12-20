import { RectRectColliding } from "../utils.js";

const sfx1 = new Audio();
sfx1.src = "assets/sfx/hit1.flac";

const sfx2 = new Audio();
sfx2.src = "assets/sfx/hit2.flac";

const sfx3 = new Audio();
sfx3.src = "assets/sfx/hit3.flac";

const hitsSFXArray = [sfx1, sfx2, sfx3];
hitsSFXArray.forEach((sfx) => (sfx.volume = 0.01));

export default class Bullet {
  constructor(canvas, x, y, velocity, damage = 1, color) {
    this.damage = damage;
    this.bulletColor = color;

    this.width = 6;
    this.height = 8;

    this.canvas = canvas;
    this.x = x - this.width / 2;
    this.y = y;
    this.velocity = velocity;

    this.sfx = hitsSFXArray[Math.floor(Math.random() * hitsSFXArray.length)];
  }

  draw(ctx) {
    this.y -= this.velocity;
    ctx.fillStyle = this.bulletColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  collideWith(object) {
    if (RectRectColliding(this, object)) {
      object?.takeDamage(this.damage);
      return true;
    } else {
      return false;
    }
  }
}
