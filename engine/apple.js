class Apple {
  constructor(snakeBody, boardDimensions) {
    this.snakeBody = snakeBody;
    this.boardDimensions = boardDimensions;
    this.applePosition = Apple.generateApplePosition(
      boardDimensions,
      snakeBody
    );
  }

  setNewApplePosition() {
    this.applePosition = Apple.generateApplePosition(
      this.boardDimensions,
      this.snakeBody
    );
  }

  static generateApplePosition(boardDimensions, snakeBody) {
    const randomX = Math.floor(Math.random() * boardDimensions[0]);
    const randomY = Math.floor(Math.random() * boardDimensions[1]);

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

  isCollided() {
    const newSnakeBody = this.snakeBody.slice();
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
