const Blog = require("./../models/Blog");

exports.getAllBlogs = async (req, res, next) => {
  res.json(await Blog.findAll());
};

exports.getBlogById = async (req, res, next) => {
  res.json(await Blog.findByPk(req.params.id));
};
