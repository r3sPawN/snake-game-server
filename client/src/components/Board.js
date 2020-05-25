import React from "react";
import "./Board.css";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";
const socket = socketIOClient(ENDPOINT);

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snake_body: [
        { x: 0, y: 0 },
        { x: 30, y: 0 },
        { x: 60, y: 0 },
      ],
      snake_direction: "RIGHT",
      apple_position: { x: null, y: null },
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.updateState();
    }, 200);

    this.canvas.focus();

    socket.on("apple_position", (apple_position) => {
      this.setState({ apple_position: apple_position });
      console.log(apple_position);
    });

    this.drawBoard();
    this.drawSnake();
    this.drawApple();
  }
  componentDidUpdate(prevProps) {
    this.drawBoard();
    this.drawSnake();
    this.drawApple();
  }

  updateState() {
    socket.emit("move", this.state.snake_direction);
    socket.on("snake_body", (snake) => {
      this.setState({ snake_body: snake });
    });
    socket.on("apple_position", (apple_position) => {
      this.setState({ apple_position: apple_position });
    });
  }

  drawBoard = () => {
    const context = this.canvas.getContext("2d");

    context.fillStyle = "orange";
    context.strokeStyle = "green";

    context.fillRect(0, 0, 800, 600);
    context.strokeRect(0, 0, 800, 600);
  };

  drawSnakePart = (snakePart) => {
    const ctx = this.canvas.getContext("2d");

    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";

    ctx.fillRect(snakePart.x, snakePart.y, 30, 30);
    ctx.strokeRect(snakePart.x, snakePart.y, 30, 30);
  };

  drawSnake = () => {
    const { snake_body } = this.state;

    snake_body.forEach(this.drawSnakePart);
  };

  drawApple = () => {
    const { apple_position } = this.state;
    const ctx = this.canvas.getContext("2d");

    let image = new Image();
    image.onload = function () {
      ctx.drawImage(image, apple_position.x, apple_position.y, 30, 30);
    };
    image.src = "https://media2.giphy.com/media/ycflgA1wZNwUppeah5/source.gif";

    // ctx.fillStyle = "red";
    // ctx.strokeStyle = "red";

    // ctx.fillRect(apple_position.x, apple_position.y, 30, 30);
    // ctx.strokeRect(apple_position.x, apple_position.y, 30, 30);
  };

  handleGameOver = () => {
    var ctx = this.canvas.getContext("2d");

    ctx.font = "20px Georgia";
    ctx.fillText("Game over", 10, 50);
  };

  handleKeyPress = (event) => {
    const down = "DOWN";
    const up = "UP";
    const left = "LEFT";
    const right = "RIGHT";

    if (event.keyCode === 38) {
      this.setState({ snake_direction: up });
    }
    if (event.keyCode === 40) {
      this.setState({ snake_direction: down });
    }
    if (event.keyCode === 39) {
      this.setState({ snake_direction: right });
    }
    if (event.keyCode === 37) {
      this.setState({ snake_direction: left });
    }
  };

  render() {
    return (
      <div className="container">
        <canvas
          ref={(canvas) => {
            this.canvas = canvas;
          }}
          width="800"
          height="600"
          onKeyDown={this.handleKeyPress}
          tabIndex="0"
        />
      </div>
    );
  }
}
