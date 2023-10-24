const Sequelize = require("sequelize");
const sequelize = require("./../utils/db");

const User = sequelize.define(
  "User",
  {
    username: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, createdAt: false, updatedAt: false }
);

User.sync();
module.exports = User;
