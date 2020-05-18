const express = require("express");
const router = express.Router();

const Snake = require("../model/snake");
const snakeEngine = require("../engine/snake");

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
});

router.delete("/:id", (req, res) => {
  Snake.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
