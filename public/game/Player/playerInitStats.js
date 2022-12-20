const playerInitStats = Object.freeze({
  MAX_BULLETS: 30,
  BULLET_SPEED: 5,
  BULLETS_GAP: 18,
  BULLETS_COLOR: "#fff",
  BULLET_DAMAGE: 1,
  BULLETS_IN_BOX_AMOUNT: 10,
  PICK_UP_RADIUS: 80,
  MOVEMENT_SPEED: 2,
  SCRAPS: 30,
  LEVEL_UP_SCRAPS_COUNT: 45,
  SCRAPS_LEVEL_UP_MODIFIER: 1.5,
  LEVEL: 1,
  WIDTH: 42,
  HEIGHT: 45,
  IMAGE: shipImage,
  IMAGE_WIDTH: 42,
  IMAGE_HEIGHT: 45,
});

export function initPlayerStats(player) {
  player.maxBullets = playerInitStats.MAX_BULLETS;
  player.bulletsLoad = player.maxBullets;
  player.bulletSpeed = playerInitStats.BULLET_SPEED;
  player.bulletGap = playerInitStats.BULLETS_GAP;
  player.bulletColor = playerInitStats.BULLETS_COLOR;
  player.bulletDamage = playerInitStats.BULLET_DAMAGE;
  player.bulletsInBoxAmount = playerInitStats.BULLETS_IN_BOX_AMOUNT;
  player.pickableRadius = playerInitStats.PICK_UP_RADIUS;
  player.movementSpeed = playerInitStats.MOVEMENT_SPEED;
  player.scraps = playerInitStats.SCRAPS;
  player.levelUpAtScrapsCount = playerInitStats.LEVEL_UP_SCRAPS_COUNT;
  player.scrapsLevelUpModifier = playerInitStats.SCRAPS_LEVEL_UP_MODIFIER;
  player.level = playerInitStats.LEVEL;
  player.width = playerInitStats.WIDTH;
  player.height = playerInitStats.HEIGHT;
  player.image = playerInitStats.IMAGE;
  player.imageWidth = playerInitStats.IMAGE_WIDTH;
  player.imageHeight = playerInitStats.IMAGE_HEIGHT;

  // player.upgrades = [
  //   new AmmoDepotUp(),
  //   new BulletDamageUp(),
  //   new PickUpRadius(),
  //   new BulletFireRate(),
  //   new PlayerSideSpeedUp(),
  //   new AmmoBoxValueUp(),
  // ];
}
