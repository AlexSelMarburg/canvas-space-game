import AmmunitionBox from "../Pickables/AmmunitionBox.js";
import Scraps from "../Pickables/Scraps.js";
import Explosion from "../VisualEffects/Explosion.js";
import { Enemy } from "../Enemy/Enemy.js";

export default class Block {
  constructor(x, y, color, health, speed, size, scrapsValue, game) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.health = health;
    this.speed = speed;
    this.canvas = game.canvas;
    this.speed = speed;
    this.scrapsValue = scrapsValue;

    this.width = size;
    this.height = size;
    this.center = { x: this.x + this.width / 2, y: this.y + this.height / 2 };
    this.borderWidth = 4;
    this.game = game;

    this.markedForDeletion = false;

    this.payload = null;
    this.enemy = null;
  }

  draw(ctx) {
    ctx.save();

    ctx.strokeStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 25;
    ctx.lineWidth = this.borderWidth;
    ctx.lineJoin = "bevel";

    ctx.strokeRect(
      this.x + this.borderWidth / 2,
      this.y + this.borderWidth / 2,
      this.width - this.borderWidth,
      this.height - this.borderWidth
    );
    ctx.restore();
  }

  update() {
    this.y += this.speed;
  }

  destroy(ctx, explosionsArray, playSFX = true) {
    explosionsArray.push(
      new Explosion(
        ctx,
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.color,
        playSFX
      )
    );

    this.payload?.releaseFromBlock();

    if (this.enemy) {
      this.enemy.markedForDeletion = true;
    }

    this.markedForDeletion = true;
  }

  generateAmmunitionBox() {
    this.payload = new AmmunitionBox(
      this.center.x,
      this.center.y,
      this.width * 0.6,
      this.color,
      this.speed
    );

    this.game.pickables.push(this.payload);

    this.health *= 1.5;
  }

  generateEnemy(bulletController) {
    this.enemy = new Enemy(
      this.center.x,
      this.center.y,
      this.width * 0.6,
      this.speed,
      bulletController
    );

    this.game.enemies.push(this.enemy);

    this.health *= 2;
  }

  dropScrapsOnDestroyed(pickables) {
    pickables.unshift(
      new Scraps(
        this.center.x,
        this.y + this.height * 0.5,
        this.speed,
        this.scrapsValue
      )
    );
  }

  takeDamage(damage) {
    this.health -= damage;
  }
}
