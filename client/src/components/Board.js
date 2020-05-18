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
      direction: "RIGHT",
      apple_possition: [{ x: 50, y: 0 }],
    };
  }

  componentDidMount() {
    //   const data = this.state;

    //   fetch("http://localhost:5000/snake", {
    //     method: "POST", // or 'PUT'
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("Success:", data);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    this.drawBoard();
    this.drawSnake();
    this.drawApple();
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
    const { apple_possition } = this.state;
    const ctx = this.canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";

    ctx.fillRect(apple_possition[0].x, apple_possition[0].y, 10, 10);
    ctx.strokeRect(apple_possition[0].x, apple_possition[0].y, 10, 10);
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
