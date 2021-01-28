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
    userId: {
      type: DataTypes.INTEGER,
      required: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // isLiked: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  Post.associate = (models) => {
    Post.belongsTo(models.User);
    Post.hasMany(models.Like);
    Post.hasMany(models.Comment);
  };
  return Post;
};
