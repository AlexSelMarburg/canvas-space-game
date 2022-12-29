import Bullet from "../Bullets/Bullet.js";

export default class EnemyBulletController {
  bullets = [];

  constructor(canvas) {
    this.canvas = canvas;
    this.shootSound = new Audio("assets/sfx/enemyShoot.wav");
    this.shootSound.volume = 0.01;
  }

  shoot(bulletX, bulletY, speed, color) {
    this.bullets.push(new Bullet(canvas, bulletX, bulletY, speed, 1, color));
    this.shootSound.currentTime = 0;
    this.shootSound.play();
  }

  draw(ctx) {
    this.bullets.forEach((bullet, index) => {
      if (this.isBulletOffScreen(bullet)) {
        this.bullets.splice(index, 1);
      }
      bullet.draw(ctx);
    });
  }

  collideWith(object) {
    return this.bullets.some((bullet) => {
      if (bullet.collideWith(object)) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        bullet.sfx.currentTime = 0;
        bullet.sfx.play();
        return true;
      }
      return false;
    });
  }

  isBulletOffScreen(bullet) {
    return bullet.y > this.canvas.height + bullet.height;
  }
}
