import {
  getNextBlocksWave,
  initWaveSettings,
} from "./Blocks/generateBlocks.js";
import BulletsController from "./Bullets/BulletsController.js";
import EnemyBulletController from "./Enemy/EnemyBulletsController.js";
import InputController from "./Player/InputController.js";
import Player from "./Player/Player.js";
import HUD from "./UI/HUD.js";

window.addEventListener("load", function (e) {
  loading.style.display = "none";
  this.document.getElementById("game-container").style.display = "block";

  /**@type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 832;
  canvas.height = 800;

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.guiMargin = 100;

      this.gameOver = false;
      this.gamePaused = false;

      this.input = new InputController();

      this.playerBulletsController = new BulletsController(canvas);
      this.enemyBulletController = new EnemyBulletController(canvas);
      this.player = new Player(this);

      this.particles = [];
      this.explosions = [];
      this.pickables = [];
      this.enemies = [];
      initWaveSettings();
      this.HUD = new HUD(this);
      this.blocks = getNextBlocksWave(this);
    }

    update(deltaTime) {
      this.player.update(this.pickables);

      // Blocks-----------------------------
      this.blocks.forEach((block) => {
        block.update();

        if (this.playerBulletsController.collideWith(block, this.particles)) {
          if (block.health <= 0) {
            block.dropScrapsOnDestroyed(this.pickables);
            block.destroy(ctx, this.explosions);
          }
        }
      });
      this.blocks = this.blocks.filter((block) => !block.markedForDeletion);

      // Particles -------------------------
      this.particles.forEach((particle) => {
        particle.update();
      });
      this.particles = this.particles.filter(
        (particle) => !particle.markedForDeletion
      );

      // Explosions ---------------------------------
      this.explosions.forEach((explosion) => {
        explosion.update();
      });
      this.explosions = this.explosions.filter(
        (explosion) => !explosion.markedForDeletion
      );

      // Enemies ------------------------------------
      this.enemies.forEach((enemy) => {
        enemy.update();
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

      // Piclkables ---------------------------------
      this.pickables.forEach((pickable) => {
        pickable.update(this.player);
      });

      this.pickables = this.pickables.filter((pick) => !pick.markedForDeletion);

      console.log(this.enemies.length);
    }

    draw(ctx) {
      ctx.clearRect(0, 0, this.width, this.height);

      [
        ...this.blocks,
        ...this.enemies,
        ...this.particles,
        ...this.explosions,
        ...this.pickables,
      ].forEach((obj) => {
        if (obj.y > this.height) obj.markedForDeletion = true;

        obj.draw(ctx);
      });

      this.player.draw(ctx);
      this.HUD.draw(ctx);

      this.playerBulletsController.draw(ctx);
      this.enemyBulletController.draw(ctx);
    }
  }

  const game = new Game(canvas);

  // let lastTime = 0;
  function animate(timeStamp) {
    // const deltaTime = timeStamp - lastTime;
    // lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update();
    game.draw(ctx);

    if (!game.gameOver) {
      requestAnimationFrame(animate);
    }
  }

  // animate(lastTime);
  animate(0);
});
