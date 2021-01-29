const { Sequelize, DataTypes } = require("sequelize");
const Post = require("./Post");
const Like = require("./Likes");
const User = require("./user");
const Comment = require("./comment");
const Experience = require("./experiences");

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    //port: process.env.PGPORT,
    dialect: "postgres",
    dialectOptions:{ssl:{require:true,rejectUnauthorized:false,},}
  }
);

// Test connection
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established"))
  .catch((e) => console.log("Unable to establish connection:", e));

//
const models = {
  User: User(sequelize, DataTypes),
  Post: Post(sequelize, DataTypes),
  Like: Like(sequelize, DataTypes),
  Comment: Comment(sequelize, DataTypes),
  Experience: Experience(sequelize, DataTypes),
};

// force sequelize to create associations
Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

// Sync models
models.sequelize = sequelize;
// Include all configurations
models.Sequelize = Sequelize;
module.exports = models;
