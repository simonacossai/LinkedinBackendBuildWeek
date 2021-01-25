const express = require("express");
const cors = require("cors");
const database = require("./utilities/database");

const {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} = require("./utilities/errorHandling");

const experiencesRoute = require("./services/experiences");

const server = express();
const port = process.env.PORT || 8001;

server.use(cors());
server.use(express.json());

server.use("/experiences", experiencesRoute);

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

database.sequelize.sync({ force: false }).then((result) => {
  server.listen(port, () => {
    console.log("Server is running on", port);
  });
});