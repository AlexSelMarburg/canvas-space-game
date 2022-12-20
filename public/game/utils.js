export function RectCircleColliding(rect, circle) {
  let dx = Math.abs(circle.x - (rect.x + rect.width / 2));
  let dy = Math.abs(circle.y - (rect.y + rect.height / 2));

  if (dx > circle.radius + rect.width / 2) {
    return false;
  }
  if (dy > circle.radius + rect.height / 2) {
    return false;
  }

  if (dx <= rect.width) {
    return true;
  }
  if (dy <= rect.height) {
    return true;
  }

  dx = dx - rect.width;
  dy = dy - rect.height;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
}

export function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export function RectRectColliding(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y
  ) {
    // Collision detected!
    return true;
  } else {
    // No collision
    return false;
  }
}

export function CircleCircleColliding(circle1, circle2) {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < circle1.radius + circle2.radius;
}

export function fyShuffle(arr) {
  let i = arr.length;
  while (--i > 0) {
    let randIndex = Math.floor(Math.random() * (i + 1));
    [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
  }

  return arr;
}
