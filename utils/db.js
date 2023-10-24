const Sequelize = require("sequelize");

const sequelize = new Sequelize("ante_media", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate();

module.exports = sequelize;
