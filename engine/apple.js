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
    const randomX = Math.floor(Math.random() * (60 - 10 + 1) + 10) * 10;
    const randomY = Math.floor(Math.random() * (60 - 10 + 1) + 10) * 10;

    const ApplePosition = { x: randomX, y: randomY };
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
