const express = require("express");
require("dotenv").config();
const cors = require("cors");
const models = require("./db");
// ROUTERS
const postRouter = require("./services/posts/index");
const userRouter = require("./services/users/index");
// const likesRouter = require("./services/likes/index");
// PORT
const port = process.env.PORT || 3001;

// SERVER
const server = express();
server.use(cors());
server.use(express.json());
server.use("/posts", postRouter);
server.use("/user", userRouter);
// server.use("/likes", likesRouter);

models.sequelize
  .sync({ force: false })

  .then((result) => {
    server.listen(port || 3001, () => console.log("Running on port " + port));
  })
  .catch((e) => console.log(e));
