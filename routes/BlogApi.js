const express = require("express");
const BlogApiController = require("./../controllers/BlogApi");
const router = express.Router();

router.get("/", BlogApiController.getAllBlogs);
router.get("/:id", BlogApiController.getBlogById);

module.exports = router;
