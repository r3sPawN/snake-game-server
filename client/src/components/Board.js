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
    }, 200);

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

  handleKeyPress = (event) => {
    console.log("we here");

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
    console.log(this.state.snake_direction);
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
