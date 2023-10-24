const Sequelize = require("sequelize");
const sequelize = require("./../utils/db");

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, createdAt: false, updatedAt: false }
);

Blog.sync();

module.exports = Blog;
