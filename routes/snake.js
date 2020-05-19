const express = require("express");
const router = express.Router();

const Snake = require("../model/snake");
const snakeEngine = require("../engine/snake");
const appleEngine = require("../engine/apple");

router.get("/", (req, res) => {
  Snake.find()
    .sort({ date: -1 })
    .then((snake) => res.json(snake));
});

router.post("/", (req, res) => {
  const newSnake = new Snake({
    snake_body: req.body.snake_body,
    snake_direction: req.body.snake_direction,
  });

  const snakeBody = snakeEngine.calculateSnakeBody(
    newSnake.snake_direction,
    newSnake.snake_body.map((info) => {
      return { x: JSON.parse(info.x), y: JSON.parse(info.y) };
    })
  );
  // const apple_position = new appleEngine(snakeBody, [100, 100]);
  // newSnake.apple_position = apple_position.applePosition;
  newSnake.snake_body = snakeBody;
  newSnake.save().then((snake) => res.json(snake));
  console.log(newSnake);
});

router.delete("/:id", (req, res) => {
  Snake.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
