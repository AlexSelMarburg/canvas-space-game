class Upgrade {
  currentLevel = 0;

  constructor(image, title) {
    this.image = image;
    this.title = title;
  }

  getUpgradeCardHTML(index) {
    return generateUpgradeCard(this, index);
  }
}

export class AmmoDepotUp extends Upgrade {
  constructor() {
    super(maxAmmoUpImage, "ammo depot expanse");
    this.values = [15, 15, 20, 25, 30, 40, 50];
    this.maxLevel = this.values.length;
  }

  performUpgrade(object) {
    if (this.currentLevel > this.maxLevel) return;

    object.maxBullets += this.values[this.currentLevel];
    this.currentLevel++;
  }

  getInfoMessage() {
    return `Erweitert das Munitionsdepotmaximum um <span class="card-info_value">${
      this.values[this.currentLevel]
    }</span>`;
  }
}

export class BulletDamageUp extends Upgrade {
  constructor() {
    super(bulletDamageUpImage, "bullet damage up");
    this.values = [1, 1, 1, 2, 2, 2, 2, 3];
    this.maxLevel = this.values.length;
  }

  performUpgrade(object) {
    if (this.currentLevel >= this.maxLevel) return;

    object.bulletDamage += this.values[this.currentLevel];
    this.currentLevel++;
  }

  getInfoMessage() {
    return `Erhöht den Schaden der Hauptwaffe um <span class="card-info_value">${
      this.values[this.currentLevel]
    }</span>`;
  }
}

export class PickUpRadius extends Upgrade {
  constructor() {
    super(pickUpRadiusImage, "pickup radius expanse");
    this.values = [10, 10, 10, 15, 15, 20];
    this.maxLevel = this.values.length;
  }

  performUpgrade(object) {
    if (this.currentLevel >= this.maxLevel) return;

    object.pickUpCircle.radius += this.values[this.currentLevel];

    this.currentLevel++;
  }

  getInfoMessage() {
    return `Erhöht den Sammelradius um <span class="card-info_value">${
      this.values[this.currentLevel]
    }</span>`;
  }
}

export class BulletFireRate extends Upgrade {
  constructor() {
    super(firingSpeedImage, "bullets rate of fire");
    this.values = [2, 2, 2, 2, 2, 2, 2];
    this.maxLevel = this.values.length;
  }

  performUpgrade(object) {
    if (this.currentLevel >= this.maxLevel) return;

    object.bulletGap -= this.values[this.currentLevel];

    this.currentLevel++;
  }

  getInfoMessage() {
    return `Reduziert Nachladezeit der Hauptwaffe um <span class="card-info_value">${
      this.values[this.currentLevel]
    }</span>`;
  }
}

export class PlayerSideSpeedUp extends Upgrade {
  constructor() {
    super(playerSpeedUpImage, "side speed up");
    this.values = [0.5, 0.5, 0.5, 0.5, 0.5];
    this.maxLevel = this.values.length;
  }

  performUpgrade(object) {
    if (this.currentLevel >= this.maxLevel) return;

    object.movementSpeed += this.values[this.currentLevel];

    this.currentLevel++;
  }

  getInfoMessage() {
    return `Erhöht die Geschwindigkeit um <span class="card-info_value">${
      this.values[this.currentLevel]
    }</span>`;
  }
}

export class AmmoBoxValueUp extends Upgrade {
  constructor() {
    super(moreAmmoInBoxImage, "ammo box amount up");
    this.values = [5, 5, 5, 10, 10, 10, 15];
    this.maxLevel = this.values.length;
  }

  performUpgrade(object) {
    if (this.currentLevel >= this.maxLevel) return;

    object.bulletsInBoxAmount += this.values[this.currentLevel];

    this.currentLevel++;
  }

  getInfoMessage() {
    return `Bulletsboxinhalt wird um <span class="card-info_value">${
      this.values[this.currentLevel]
    }</span> erhöht`;
  }
}

//-----------------------------------
export class ExtraAmmoBox extends Upgrade {
  constructor() {
    super(getAmmoImage, "simple ammo box");
    this.value = 20;
  }

  performUpgrade(object) {
    if (object.bulletsLoad + this.value > object.maxBullets) {
      object.bulletsLoad = object.maxBullets;
    } else {
      object.bulletsLoad += this.value;
    }
  }

  getInfoMessage() {
    return `Erhalte <span class="card-info_value">${this.value}</span> bullets`;
  }
}

function generateUpgradeCard(upgrade, index) {
  let card = `
    <div class="upgrade-card ${
      index === 0 ? "active" : ""
    }" data-abc-def=${index}>
      <div class="upgrade-card_title">${upgrade.title}</div>
    
      <div class="upgrade-card_image_container">
        <img src=${upgrade.image.src} alt="" />
      </div>

      <div class="upgrade-card_info">
        ${upgrade.getInfoMessage()}
      </div>

  </div>
  `;

  return card;
}
