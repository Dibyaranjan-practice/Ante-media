const express = require("express");
const { body } = require("express-validator");
const BlogController = require("./../controllers/Blog");
const formValidator = require("./../validations/formValidator");
const router = express.Router();

router.get("/", BlogController.getAllBlog);
router.get("/add-blog", BlogController.getAddBlog);
router.post(
  "/add-blog",formValidator,
  BlogController.postAddBlog
);
router.get("/edit-blog/:id", BlogController.getEditBlog);
router.post("/edit-blog/:id", BlogController.postEditBlog);
router.get("/delete-blog/:id", BlogController.getDeleteBlog);
module.exports = router;
