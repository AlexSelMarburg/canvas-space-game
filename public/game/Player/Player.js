import { CircleCircleColliding } from "../utils.js";
import { initPlayerStats } from "./playerInitStats.js";
import Thruster from "./Thruster.js";

export default class Player {
  constructor(game) {
    this.init();
    this.game = game;
    this.canvas = game.canvas;
    this.gameWidth = game.width;
    this.gameHeight = game.height;

    this.timerTillNextBullet = 0;
    this.bulletController = game.playerBulletsController;

    this.destroyed = false;

    this.x = this.gameWidth / 2 - this.width / 2;
    this.y = this.gameHeight - this.height - game.guiMargin - 20;

    this.speed = 0;

    // Pickables collection ----------------
    this.pickUpCircle = {
      x: this.x + this.width * 0.5,
      y: this.y + this.height * 0.5,
      radius: this.pickableRadius,
    };

    this.pickUpCollectionPoint = {
      x: this.pickUpCircle.x,
      y: this.pickUpCircle.y,
      radius: 5,
    };

    // --THRUSTERS --------------------------
    this.thrusterPosition1 = { x: this.x + 4, y: this.y + this.height - 5 };
    this.thruster1 = new Thruster(this.thrusterPosition1);

    this.thrusterPosition2 = {
      x: this.x + this.width - 16,
      y: this.y + this.height - 5,
    };
    this.thruster2 = new Thruster(this.thrusterPosition2);
  }

  draw(ctx) {
    this.thruster1.draw(ctx);
    this.thruster2.draw(ctx);

    ctx.save();

    ctx.shadowBlur = 15;
    ctx.shadowColor = "aqua";

    ctx.drawImage(
      this.image,
      0,
      0,
      this.imageWidth,
      this.imageHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    ctx.restore();
  }

  update(pickables) {
    if (this.destroyed === false) {
      // movement-left-right
      if (this.game.input.keys.indexOf("ArrowRight") > -1) {
        this.speed = this.movementSpeed;
      } else if (this.game.input.keys.indexOf("ArrowLeft") > -1) {
        this.speed = -this.movementSpeed;
      } else {
        this.speed = 0;
      }

      this.x += this.speed;

      // boundaries
      if (this.x <= 0) {
        this.x = 0;
      }

      if (this.x > this.gameWidth - this.width) {
        this.x = this.gameWidth - this.width;
      }

      // shoot a bullet
      if (this.game.input.keys.indexOf(" ") > -1) {
        if (this.timerTillNextBullet <= 0 && this.bulletsLoad > 0) {
          this.bulletsLoad -= 1;
          this.bulletController.shoot(
            this.x + this.width / 2,
            this.y - 5,
            this.bulletSpeed,
            this.bulletDamage,
            this.bulletColor
          );

          this.timerTillNextBullet = this.bulletGap;
        }

        this.timerTillNextBullet--;
      }

      // pickables collection position update
      this.collideWithPickable(pickables);

      this.pickUpCircle.x = this.x + this.width * 0.5;
      this.pickUpCircle.y = this.y + this.height * 0.5;

      this.pickUpCollectionPoint.x = this.pickUpCircle.x;
      this.pickUpCollectionPoint.y = this.pickUpCircle.y;
      // thrusters position update ------------------------
      this.thrusterPosition1 = {
        x: this.x + 4,
        y: this.y + this.height - 5,
      };

      this.thrusterPosition2 = {
        x: this.x + this.width - 16,
        y: this.y + this.height - 5,
      };

      this.thruster1.update(this.thrusterPosition1);
      this.thruster2.update(this.thrusterPosition2);
    }
  }

  collideWithPickable(pickables) {
    pickables.forEach((pickable, index) => {
      pickable.isInCollectionRadiusOfPlayer(this);

      if (
        !pickable.bound &&
        CircleCircleColliding(
          pickable.collisionCircle,
          this.pickUpCollectionPoint
        )
      ) {
        if (pickable.type === "scraps") {
          this.scraps += pickable.scrapsValue;

          if (this.scraps >= this.levelUpAtScrapsCount) {
            let scrapsOverNeededForLevelUp =
              this.levelUpAtScrapsCount - this.scraps;

            this.scraps = Math.abs(scrapsOverNeededForLevelUp);
            this.level++;
            this.levelUpAtScrapsCount = Math.round(
              this.levelUpAtScrapsCount * this.scrapsLevelUpModifier
            );
            this.game.gamePaused = true;
          }
        }

        if (pickable.type === "ammo") {
          if (this.bulletsLoad + this.bulletsInBoxAmount > this.maxBullets) {
            this.bulletsLoad = this.maxBullets;
          } else {
            this.bulletsLoad += this.bulletsInBoxAmount;
          }
        }

        pickable.playSound();
        pickable.markedForDeletion = true;
      }
    });
  }

  init() {
    initPlayerStats(this);
  }
}
