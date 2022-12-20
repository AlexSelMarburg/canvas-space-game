import { CircleCircleColliding } from "../utils.js";

const sfx = new Audio();
sfx.src = "assets/sfx/scrapsCollected.wav";
sfx.volume = 0.2;

export default class Scraps {
  constructor(x, y, speed, scrapsValue) {
    this.scrapsValue = scrapsValue;
    this.type = "scraps";
    this.width = 20;
    this.height = 20;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;

    this.image = scrapsImage;

    this.sfx = sfx;
    this.standardSpeed = speed;
    this.speed = this.standardSpeed;
    this.playerPickUpSpeed = 10;

    this.movesTowardsPlayer = false;
    this.markedForDeletion = false;
    this.allClearedPlayCollect = false;

    this.velocity = { x: 0, y: 0 };

    this.collisionCircle = {
      radius: this.width * 0.5,
      x: this.x + this.width * 0.5,
      y: this.y + this.height * 0.5,
    };
  }

  update(player) {
    this.collisionCircle.x = this.x + this.width * 0.5;
    this.collisionCircle.y = this.y + this.height * 0.5;

    if (this.allClearedPlayCollect || this.movesTowardsPlayer) {
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
      this.y += this.standardSpeed;
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
      16,
      16,
      this.x,
      this.y,
      this.width,
      this.height
    );

    ctx.restore();
  }

  playSound() {
    if (!this.allClearedPlayCollect) {
      this.sfx.currentTime = 0;
      this.sfx.play();
    }

    this.sfx.play();
  }

  isInCollectionRadiusOfPlayer(player) {
    if (
      !this.allClearedPlayCollect &&
      CircleCircleColliding(this.collisionCircle, player.pickUpCircle)
    ) {
      this.movesTowardsPlayer = true;
    } else {
      this.movesTowardsPlayer = false;
    }
  }
}
