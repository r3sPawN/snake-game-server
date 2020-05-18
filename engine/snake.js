const DIRECTIONS = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

class Snake {
  // constructor(snakeSize) {
  //   this.snakeBody = [...new Array(snakeSize)].map((element, index) => ({ x: 0, y: index }));
  // }

  move(direction) {
    this.snakeBody = Snake.calculateSnakeBody(direction, this.snakeBody);
  }

  increaseSnakeSize() {
    const newSnakeBody = this.snakeBody.slice();
    const Tail = newSnakeBody.shift();
    this.snakeBody.unshift(Tail);
  }

  static calculateSnakeBody(direction, snakeBody) {
    if (
      DIRECTIONS.UP !== direction &&
      DIRECTIONS.DOWN !== direction &&
      DIRECTIONS.LEFT !== direction &&
      DIRECTIONS.RIGHT !== direction
    ) {
      throw new Error("wrong input");
    }

    const newSnakeBody = snakeBody.slice();
    newSnakeBody.shift();
    const snakeHead = snakeBody.pop();
    const newHead = { ...snakeHead };

    if (direction === "UP") {
      newHead.x -= 1;
    }

    if (direction === "DOWN") {
      newHead.x += 1;
    }

    if (direction === "LEFT") {
      newHead.y -= 1;
    }

    if (direction === "RIGHT") {
      newHead.y += 1;
    }

    if (
      newSnakeBody.some(
        (element) => element.x === newHead.x && element.y === newHead.y
      )
    ) {
      throw new Error("The game is over");
    }

    newSnakeBody.push(newHead);

    return newSnakeBody;
  }
}

module.exports = Snake;
