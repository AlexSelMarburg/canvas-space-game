import Block from "./Block.js";
import { fyShuffle } from "../utils.js";

const initialWaveSettings = Object.freeze({
  WAVE_NUMBER: 0,
  WAVE_SPEED: 0.2,
  BLOCK_ROWS: 5,
  BLOCK_COLUMNS: 12,
  BLOCK_SIZE: 64,
  BLOCK_GAP: 5,
  BLOCK_HEALTH: 0,
  BLOCK_HEALTH_INCREASE_PER_WAVE: 0.5,
  PICKABLE_COUNT: 5,
  ENEMIES_COUNT: 12,
  SCRAPS_VALUE: 1,
});

export let currentWaveSettings = null;
export function initWaveSettings() {
  currentWaveSettings = {
    waveNr: initialWaveSettings.WAVE_NUMBER,
    blockRows: initialWaveSettings.BLOCK_ROWS,
    blockColumns: initialWaveSettings.BLOCK_COLUMNS,
    blockSize: initialWaveSettings.BLOCK_SIZE,
    blocksGap: initialWaveSettings.BLOCK_GAP,
    blockHealth: initialWaveSettings.BLOCK_HEALTH,
    blockHealthIncreasePerWave:
      initialWaveSettings.BLOCK_HEALTH_INCREASE_PER_WAVE,
    pickablesCount: initialWaveSettings.PICKABLE_COUNT,
    enemiesCount: initialWaveSettings.ENEMIES_COUNT,
    scrapsValue: initialWaveSettings.SCRAPS_VALUE,
    waveSpeed: initialWaveSettings.WAVE_SPEED,
  };
}

const colors = [
  "#2069e0",
  "#f4d47c",
  "#878683",
  "#bebebe",
  "#dbf227",
  "#d6d58e",
  "#9fc131",
  "#00AB95",
  "#c70039",
];

export function getRandomColor(colorsCount) {
  let colorsArray = [];
  let lastColor = "";
  let color = getRandomColorFromArrays(colors);

  for (let i = 0; i < colorsCount; i++) {
    if (color !== lastColor) {
      colorsArray.push(color);
      lastColor = color;
    }

    while (lastColor === color) {
      color = getRandomColorFromArrays(colors);
    }
  }

  return colorsArray;

  function getRandomColorFromArrays(colorsArray) {
    return colorsArray[Math.floor(Math.random() * colorsArray.length)];
  }
}

export function getNextBlocksWave(game) {
  currentWaveSettings.waveNr++;
  currentWaveSettings.blockHealth +=
    currentWaveSettings.blockHealthIncreasePerWave;

  const {
    blockRows,
    blockColumns,
    blockSize,
    blocksGap,
    blockHealth,
    pickablesCount,
    enemiesCount,
    scrapsValue,
    waveSpeed,
  } = currentWaveSettings;

  let colorsCount = blockRows * blockColumns;
  let colors = getRandomColor(colorsCount);
  const blocks = [];

  let colorIndex = 0;
  for (let i = 0; i < blockRows; i++) {
    for (let k = 0; k < blockColumns; k++, colorIndex++) {
      let x = blocksGap + k * (blockSize + blocksGap);
      let y = blocksGap + i * -(blockSize + blocksGap) - blockSize * 1.5;
      let color = colors[colorIndex];
      blocks.push(
        new Block(
          x,
          y - 50, //
          color,
          blockHealth,
          waveSpeed,
          blockSize,
          scrapsValue,
          game
        )
      );
    }
  }

  let blockHasPayloadIndeciesArr = fyShuffle([
    ...Array(blockRows * blockColumns).keys(),
  ]);

  for (let i = 0; i < pickablesCount + enemiesCount; i++) {
    if (i < pickablesCount) {
      blocks[blockHasPayloadIndeciesArr[i]].generateAmmunitionBox();
    } else {
      blocks[blockHasPayloadIndeciesArr[i]].generateEnemy(
        game.enemyBulletController
      );
    }
  }

  return blocks;
}
