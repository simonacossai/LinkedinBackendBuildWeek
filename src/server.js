const express = require("express");
require("dotenv").config();
const listEndpoints = require('express-list-endpoints')
const userRouter = require("./services/users");
const db = require("./db");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());
server.use("/user", userRouter);


console.log(listEndpoints(server));
db.sequelize.sync({ force: false }).then((result) => {
  server.listen(process.env.PORT || 3001, () => {
    console.log("server is running onn port ", process.env.PORT || 3001);
  });
});