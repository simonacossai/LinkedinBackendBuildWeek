module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      required: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      required: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  //   Post.associate = (models) => {
  //     Post.belongsTo(models.user);
  //   };
  return Post;
};
