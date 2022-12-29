import Background from "./Background/Background.js";
import {
  getNextBlocksWave,
  initWaveSettings,
} from "./Blocks/generateBlocks.js";
import BulletsController from "./Bullets/BulletsController.js";
import EnemyBulletController from "./Enemy/EnemyBulletsController.js";
import InputController from "./Player/InputController.js";
import Player from "./Player/Player.js";
import HUD from "./UI/HUD.js";
import { generateCards } from "./Upgrades/upgradesHandler.js";
import { RectRectColliding } from "./utils.js";

export let game = null;
const upgradesPanel = document.getElementById("upgrades-container");
let tick = 0;

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

      this.background = new Background();

      this.gameMusic = new Audio("assets/sfx/gameMusic.wav");
      this.gameMusic.volume = 0.01;
      this.gameMusic.loop = true;

      this.gameOverSFX = new Audio("assets/sfx/gameover.mp3");
      this.gameOverSFX.volume = 0.05;

      this.allEnemiesDestroyedSFX = new Audio(
        "assets/sfx/allEnemiesDestroyed.wav"
      );
      this.allEnemiesDestroyedSFX.volume = 0.05;

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
      this.background.update();

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

      // zerstöre ALLE blocks, wenn alle blocks mit
      // enemies zerstört wurden
      if (this.blocks.length && this.blocks.every((block) => !block.enemy)) {
        this.blocks.forEach((block) => {
          block.dropScrapsOnDestroyed(this.pickables);
          block.destroy(ctx, this.explosions, false);
        });

        this.allEnemiesDestroyedSFX.play();
        this.pickables.forEach((pick) => {
          if (pick.type === "scraps") {
            pick.currentWaveEnemiesCleared = true;
          }
        });
      }

      // Piclkables ---------------------------------
      this.pickables.forEach((pickable) => {
        pickable.update(this.player);
      });

      this.pickables = this.pickables.filter((pick) => !pick.markedForDeletion);

      if (this.blocks.length === 0) {
        this.blocks = getNextBlocksWave(this);
        initWaveSettings.waveNr++;
      }

      // Game Over -----------------------------------
      this.blocks.some((block) => {
        if (!this.player.destroyed && RectRectColliding(this.player, block)) {
          this.explosions.push(this.player.destroy(ctx));
          setTimeout(() => {
            game.gameOver = true;
          }, 1000);
        }
      });

      if (
        !this.player.destroyed &&
        this.enemyBulletController.bullets.some((bullet) => {
          return RectRectColliding(bullet, this.player);
        })
      ) {
        this.explosions.push(this.player.destroy(ctx));
        setTimeout(() => {
          game.gameOver = true;
        }, 1000);
      }
    }

    draw(ctx) {
      ctx.clearRect(0, 0, this.width, this.height);

      [
        this.background,
        ...this.blocks,
        ...this.enemies,
        ...this.particles,
        ...this.explosions,
        ...this.pickables,
      ].forEach((obj) => {
        if (obj.y > this.height) obj.markedForDeletion = true;

        obj.draw(ctx);
      });

      this.playerBulletsController.draw(ctx);
      this.enemyBulletController.draw(ctx);

      this.player.draw(ctx);
      this.HUD.draw(ctx);
    }

    pickUppgrade(player) {
      upgradesPanel.classList.remove("hidden");

      generateCards(upgradesPanel, this.player);
    }

    unpuaseGame() {
      this.gamePaused = false;

      upgradesPanel.classList.add("hidden");
      cancelAnimationFrame(tick);
      tick = requestAnimationFrame(animate);
    }
  }

  game = new Game(canvas);
  game.gameMusic.play();

  // let lastTime = 0;
  function animate(timeStamp) {
    // const deltaTime = timeStamp - lastTime;
    // lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update();
    game.draw(ctx);

    if (!game.gameOver) {
      if (!game.gamePaused) {
        tick = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(tick);
        game.pickUppgrade(game.player);
      }
    } else {
      cancelAnimationFrame(tick);
      game.gameMusic.pause();
      game.gameMusic.currentTime = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.gameOverSFX.play();
      ctx.save();

      ctx.fillStyle = "orange";
      ctx.fillRect(0, canvas.height * 0.5 - 130, canvas.width, 200);

      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.font = "76px Arial";
      let text = "GAME OVER!";
      ctx.fillText(text, canvas.width * 0.5, canvas.height / 2);
      ctx.lineWidth = 2;

      ctx.strokeStyle = "#000";
      ctx.strokeText(text, canvas.width * 0.5, canvas.height / 2);

      ctx.fillStyle = "#053856";
      ctx.font = "bold 32px Helvetica, sans-serif";
      ctx.fillText(
        "click to end game",
        canvas.width / 2,
        canvas.height / 2 + 40
      );

      ctx.restore();

      canvas.addEventListener("click", () => {
        window.location.href = "../index.html";
      });
    }
  }

  // animate(lastTime);
  animate(0);
});
