import { currentWaveSettings } from "../Blocks/generateBlocks.js";

export default class HUD {
  constructor(game) {
    this.canvas = game.canvas;
    this.player = game.player;
    this.height = game.guiMargin;
    this.x = 0;
    this.y = this.canvas.height - this.height;
    this.scrapsBarHeight = 25;

    this.textColor = "#FFB200";
  }

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = "#212832";
    ctx.fillRect(this.x, this.y, this.canvas.width, this.height);

    this.drawScrapsBar(ctx);
    this.drawScrapsBarInner(ctx);
    this.drawScrapsText(ctx);
    this.drawPlayerLevel(ctx);
    this.drawWaveNumbers(ctx);
    this.drawPlayerStats(ctx);

    ctx.restore();
  }

  drawScrapsBar(ctx) {
    // scraps bar-border
    ctx.save();
    ctx.strokeStyle = "#19202A";
    ctx.fillStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(
      this.x + 10,
      this.y + 10,
      this.canvas.width - 20,
      this.scrapsBarHeight,
      5
    );
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }

  drawScrapsBarInner(ctx) {
    let scrapsPrecentage =
      ((this.canvas.width - 10) *
        (this.player.scraps / (this.player.levelUpAtScrapsCount / 100))) /
      100;

    ctx.save();

    ctx.beginPath();
    ctx.fillStyle = this.textColor;
    ctx.roundRect(
      this.x + 10,
      this.y + 10,
      scrapsPrecentage,
      this.scrapsBarHeight,
      5
    );
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }

  drawScrapsText(ctx) {
    ctx.save();
    ctx.fillStyle = "#19202A";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    let scrapsText = `SCRAPS: ${this.player.scraps} / ${this.player.levelUpAtScrapsCount}`;
    ctx.fillText(scrapsText, this.canvas.width / 2, canvas.height - 70);
    ctx.restore();
  }

  drawPlayerLevel(ctx) {
    ctx.fillStyle = "#fff";
    ctx.font = "21px Arial";
    let playerLevelText = `level: ${this.player.level}`;
    ctx.fillText(playerLevelText, 10, canvas.height - 40);
  }

  drawWaveNumbers(ctx) {
    ctx.fillStyle = "#fff";
    ctx.font = "21px Arial";
    let waveNumberText = `waveNr: ${currentWaveSettings.waveNr}`;
    ctx.fillText(waveNumberText, 10, canvas.height - 15);
  }

  drawPlayerStats(ctx) {
    ctx.save();
    ctx.fillStyle = this.textColor;
    ctx.font = "18px Arial";
    ctx.textAlign = "left";

    let bulletsText = `ammo: ${this.player.bulletsLoad} / ${this.player.maxBullets}`;
    ctx.fillText(bulletsText, this.canvas.width * 0.5 - 50, canvas.height - 45);

    ctx.font = "15px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "right";
    let bulletsDamageText = `damage: ${this.player.bulletDamage}`;
    ctx.fillText(bulletsDamageText, this.canvas.width - 10, canvas.height - 46);

    let movementSpeedText = `speed: ${this.player.movementSpeed}`;
    ctx.fillText(movementSpeedText, this.canvas.width - 10, canvas.height - 26);

    let pickableRadiusText = `pick up radius: ${this.player.pickableRadius}`;
    ctx.fillText(pickableRadiusText, this.canvas.width - 10, canvas.height - 6);

    ctx.restore();
  }
}
