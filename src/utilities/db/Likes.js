module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
