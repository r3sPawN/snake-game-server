class Apple {
  constructor(snakeBody, boardDimensions) {
    this.snakeBody = snakeBody;
    this.boardDimensions = boardDimensions;
    this.applePosition = Apple.generateApplePosition(
      boardDimensions,
      snakeBody
    );
  }

  setNewApplePosition(snakeBody) {
    this.applePosition = Apple.generateApplePosition(
      this.boardDimensions,
      snakeBody
    );
  }

  static generateApplePosition(boardDimensions, snakeBody) {
    const randomX = Math.floor(Math.random() * (50 - 10 + 1) + 10) * 10;
    const randomY = Math.floor(Math.random() * (50 - 10 + 1) + 10) * 10;
    const randomx = Math.round(randomX / 30) * 30;
    const randomy = Math.round(randomY / 30) * 30;

    const ApplePosition = { x: randomx, y: randomy };
    if (
      snakeBody.some(
        (element) =>
          element.x === ApplePosition.x && element.y === ApplePosition.y
      )
    ) {
      this.generateApplePosition(boardDimensions, snakeBody);
    }

    return ApplePosition;
  }

  isCollided(snakeBody) {
    const newSnakeBody = snakeBody.slice();
    const snakeHead = newSnakeBody.pop();
    const newHead = { ...snakeHead };

    if (
      this.applePosition.x === newHead.x &&
      this.applePosition.y === newHead.y
    ) {
      return true;
    }
    return false;
  }
}

module.exports = Apple;
