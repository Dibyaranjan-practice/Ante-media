const Sequelize = require("sequelize");
const sequelize = require("./../utils/db");

const Clientle = sequelize.define("Clientele", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Clientle.sync();

module.exports = Clientle;
