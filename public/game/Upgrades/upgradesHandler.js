import { game } from "../game.js";
import { fyShuffle } from "../utils.js";
import { ExtraAmmoBox } from "./upgrades.js";

export function generateCards(parentElement, player) {
  let upgradeIndex = 0;

  const filteredUpgrades = player.upgrades.filter(
    (upgrade) => upgrade.currentLevel < upgrade.maxLevel
  );
  fyShuffle(filteredUpgrades);
  const randomUpgrades = filteredUpgrades.slice(0, 3);

  while (randomUpgrades.length < 3) {
    randomUpgrades.push(new ExtraAmmoBox());
  }

  const pickUpgradeBtn = document.getElementById("upgrade-button");
  pickUpgradeBtn.addEventListener(
    "click",
    () => {
      randomUpgrades[upgradeIndex].performUpgrade(player);
      game.unpuaseGame();
    },
    { once: true }
  );

  const upgradesImageContainer = document.getElementById("cards-container");

  let content = "";

  randomUpgrades.forEach((upgrade, index) => {
    let card = upgrade.getUpgradeCardHTML(index);

    content += card;
  });

  upgradesImageContainer.textContent = "";
  upgradesImageContainer.insertAdjacentHTML("afterbegin", content);

  upgradesImageContainer.addEventListener("click", getDataSet);

  function getDataSet(e) {
    const card = e.target.closest(".upgrade-card");
    if (!card) return;

    upgradeIndex = card.dataset.abcDef;

    const cards = upgradesImageContainer.querySelectorAll(".upgrade-card");

    // remove/add active-class
    cards.forEach((card) => {
      if (card.dataset.abcDef === upgradeIndex) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });
  }
}
