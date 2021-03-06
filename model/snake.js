const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SnakeSchema = new Schema({
  snake_body: {
    type: Array,
    required: true,
  },
  snake_direction: {
    type: String,
    required: true,
  },
  apple_position: {
    type: Array,
  },
});

module.exports = Snake = mongoose.model("snake", SnakeSchema);
