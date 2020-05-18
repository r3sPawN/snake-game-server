import React from "react";
import "./Board.css";

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snake_body: [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
        { x: 20, y: 0 },
      ],
      snake_direction: "RIGHT",
      apple_position: [{ x: 50, y: 50 }],
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.updateState();
    }, 500);

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
    const data = this.state;

    fetch("http://localhost:5000/snake", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          snake_body: data.snake_body,
          //apple_position: data.apple_position,
        });
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
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
    ctx.strokeStyle = "green";

    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  };

  drawSnake = () => {
    const { snake_body } = this.state;

    snake_body.forEach(this.drawSnakePart);
  };

  drawApple = () => {
    const { apple_position } = this.state;
    const ctx = this.canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";

    ctx.fillRect(apple_position[0].x, apple_position[0].y, 10, 10);
    ctx.strokeRect(apple_position[0].x, apple_position[0].y, 10, 10);
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
        />
      </div>
    );
  }
}
