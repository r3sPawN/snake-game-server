const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
const snakeEngine = require("./engine/snake");
const appleEnige = require("./engine/apple");
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
let interval;

let newSnake = new snakeEngine(3);

io.on("connect", (socket) => {
  let apple = new appleEnige(newSnake.snakeBody, [50, 50]);
  socket.emit("apple_position", apple.applePosition);
  console.log(apple.applePosition);
  socket.on("error", (error) => {
    error;
  });
  socket.on("move", (data) => {
    newSnake.move(data);
    if (apple.isCollided(newSnake.snakeBody)) {
      newSnake.increaseSnakeSize();
      apple.setNewApplePosition(newSnake.snakeBody);
      io.emit("apple_position", apple.applePosition);
    }
    io.emit("snake_body", newSnake.snakeBody);
    //console.log(newSnake);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
