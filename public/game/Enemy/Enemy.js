import { getRandomNumber } from "../utils.js";

export class Enemy {
  constructor(x, y, size, speed, bulletController) {
    this.type = "enemy";
    this.width = size;
    this.height = size;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.speed = speed;
    this.bulletSpeed = getRandomNumber(2, 4);
    this.bulletColor = "orange";
    this.bulletController = bulletController;

    this.image = enemyImage;
    this.bound = true;

    this.fireBulletTimerDefault = getRandomNumber(350, 600);
    this.fireBulletTimer = this.fireBulletTimerDefault;

    this.markedForDeletion = false;
  }

  update() {
    this.y += this.speed;

    this.fireBulletTimer--;
    if (this.y > 0 && this.fireBulletTimer <= 0) {
      this.fireBulletTimer = this.fireBulletTimerDefault;
      this.shoot();
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      0,
      0,
      40,
      40,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  shoot() {
    this.bulletController.shoot(
      this.x + this.width / 2,
      this.y + this.height - 10,
      -this.bulletSpeed,
      this.bulletColor
    );
  }
}
