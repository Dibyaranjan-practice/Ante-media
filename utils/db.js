const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "ante_media",
  process.env.DB_NAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DOMAIN,
    dialect: process.env.DB,
  }
);

sequelize.authenticate();

module.exports = sequelize;
