const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
dotenv.config();

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(
  "mongodb+srv://`${process.env.DB_USER}`:`${process.env.DB_PASS}`@cluster0.62g4m.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use((req,res, next) => {
  req.io = io;

  next();
});

app.use(cors());

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./routes"));

server.listen(3333);
