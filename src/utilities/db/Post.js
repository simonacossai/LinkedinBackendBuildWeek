module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      required: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
   Post.associate = (models) => {
    Post.belongsTo(models.User);
   };
  return Post;
};
