module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      required: true,
      references: {
        model: "User",
        key: "id",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      required: true,
      references: {
        model: "Post",
        key: "id",
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  Like.associate = (models) => {
    Like.belongsTo(models.User);
    Like.belongsTo(models.Post);
  };
  return Like;
};
