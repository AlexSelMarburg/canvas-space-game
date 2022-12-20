export default class InputController {
  constructor() {
    this.keys = [];

    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowRight" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowDown" ||
          e.key === " ") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      }
    });

    window.addEventListener("keyup", (e) => {
      const keyIndex = this.keys.indexOf(e.key);
      if (
        e.key === "ArrowRight" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === " "
      ) {
        this.keys.splice(keyIndex, 1);
      }
    });
  }
}
