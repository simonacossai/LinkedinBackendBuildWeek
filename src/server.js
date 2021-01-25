const express = require("express");
require("dotenv").config();
const cors = require("cors");
const models = require("./db");
// ROUTERS
const postRouter = require("./services/posts/Post");
const userRouter = require("./services/users/index")
// PORT
const port = process.env.PORT || 3001;

// SERVER
const server = express();
server.use(cors());
server.use(express.json());
server.use("/posts", postRouter);
server.use("/user", userRouter)


models.sequelize
  .sync({ force: false })

  .then((result) => {
    server.listen(port || 3002, () => console.log("Running on port " + port));
  })
  .catch((e) => console.log(e));
