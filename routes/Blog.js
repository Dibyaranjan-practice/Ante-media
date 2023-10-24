const express = require("express");
const { body } = require("express-validator");
const BlogController = require("./../controllers/Blog");

const router = express.Router();

router.get("/", BlogController.getAllBlog);
router.get("/add-blog", BlogController.getAddBlog);
router.post(
  "/add-blog",
  [
    body("title")
      .isLength({ min: 3, max: 100 })
      .withMessage("min-length 3 and max-length 100"),
    body("description")
      .isLength({ min: 10, max: 100 })
      .withMessage("min-length 10 and max-length 100"),
  ],
  BlogController.postAddBlog
);
router.get("/edit-blog/:id", BlogController.getEditBlog);
router.post("/edit-blog/:id", BlogController.postEditBlog);
router.get("/delete-blog/:id", BlogController.getDeleteBlog);
module.exports = router;
