import { CircleCircleColliding } from "../utils.js";

const sfx = new Audio();
sfx.src = "assets/sfx/ammoBoxCollected.wav";
sfx.volume = 0.2;

export default class AmmunitionBox {
  constructor(x, y, size, color, speed) {
    this.type = "ammo";
    this.width = size;
    this.height = size;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;

    this.collisionCircle = {
      radius: this.width * 0.5,
      x: this.x + this.width * 0.5,
      y: this.y + this.height * 0.5,
    };

    this.sfx = sfx;
    this.color = color;
    this.standardSpeed = speed;
    this.unboundSpeed = speed * 6;
    this.speed = this.standardSpeed;
    this.playerPickUpSpeed = 10;

    this.velocity = { x: 0, y: 0 };

    this.image = AmmunitionBoxImage;
    this.bound = true;

    this.markedForDeletion = false;
    this.movesTowardsPlayer = false;
  }

  update(player) {
    this.collisionCircle.x = this.x + this.width * 0.5;
    this.collisionCircle.y = this.y + this.height * 0.5;

    if (this.movesTowardsPlayer) {
      this.speed = this.playerPickUpSpeed;

      const angle = Math.atan2(
        player.pickUpCollectionPoint.y - this.collisionCircle.y,
        player.pickUpCollectionPoint.x - this.collisionCircle.x
      );

      this.velocity.y = Math.sin(angle) * this.speed;
      this.velocity.x = Math.cos(angle) * this.speed;

      this.x += this.velocity.x;
      this.y += this.velocity.y;
    } else {
      if (!this.bound) {
        this.y += this.unboundSpeed;
      } else {
        this.y += this.standardSpeed;
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#fff";
    ctx.drawImage(
      this.image,
      0,
      0,
      100,
      100,
      this.x,
      this.y,
      this.width,
      this.height
    );

    ctx.restore();
  }

  releaseFromBlock() {
    this.bound = false;
    this.speed = 2;
  }

  playSound() {
    this.sfx.currentTime = 0;
    this.sfx.play();
  }

  isInCollectionRadiusOfPlayer(player) {
    if (
      !this.bound &&
      CircleCircleColliding(this.collisionCircle, player.pickUpCircle)
    ) {
      this.movesTowardsPlayer = true;
    } else {
      this.movesTowardsPlayer = false;
    }
  }
}
