const express = require("express");
const mongoose = require("mongoose");

const app = express();
const snake = require("./routes/snake");

app.use(express.json());

// DB config

const db = require("./config/keys").mongoURI;

// connect to mongo

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MOngoDB Connected.."))
  .catch((err) => console.log(err));

// use routes
app.use("/snake", snake);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on port ${port}`));
