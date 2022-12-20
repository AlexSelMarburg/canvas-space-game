import Bullet from "./Bullet.js";
import { HitDust } from "../VisualEffects/particles.js";

export default class BulletsController {
  bullets = [];
  timerTillNextBullet = 0;

  constructor(canvas) {
    this.canvas = canvas;
    this.shootSound = new Audio("assets/sfx/shoot.wav");
    this.shootSound.volume = 0.005;
  }

  shoot(bulletX, bulletY, speed, damage, color) {
    this.bullets.push(
      new Bullet(canvas, bulletX, bulletY, speed, damage, color)
    );

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

  collideWith(object, particles) {
    return this.bullets.some((bullet) => {
      if (bullet.collideWith(object)) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        bullet.sfx.currentTime = 0;
        bullet.sfx.play();

        for (let i = 0; i < 10; i++) {
          particles.unshift(
            new HitDust(
              bullet.x + bullet.width * 0.5,
              bullet.y + 5,
              object.color
            )
          );
        }

        return true;
      }
      return false;
    });
  }

  isBulletOffScreen(bullet) {
    return bullet.y <= -bullet.height;
  }
}
