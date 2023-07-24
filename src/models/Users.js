const { DataTypes } = require("sequelize");
const db = require("../database");

const User = db.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  followers: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  following: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  twitter_username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
