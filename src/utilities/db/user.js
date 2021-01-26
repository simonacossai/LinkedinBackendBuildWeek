module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      area: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: "http://placehold.it/50x50",
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: true,
    }
  );
   User.associate = (models) => {
    //User.hasMany(models.Post);
     //User.hasMany(models.Like);
     User.hasMany(models.Experience)
   };
  return User;
};

