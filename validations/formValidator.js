const { body } = require("express-validator");

module.exports = [
  body("title").notEmpty().withMessage("title can't be empty"),
  body("description").notEmpty().withMessage("description can't be empty"),
];
