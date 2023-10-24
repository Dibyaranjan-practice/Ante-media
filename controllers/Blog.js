const Blog = require("./../models/Blog");
const { validationResult } = require("express-validator");

exports.getBlog = (req, res, next) => {
  res.render("blog/addblog");
};

exports.postAddBlog = (req, res, next) => {
  const possibleErrors = { title: "", description: "" };
  let errors = validationResult(req);
  if (errors.isEmpty()) {
    Blog.create({
      title: req.body.title,
      description: req.body.description,
      imageUrl: "http://localhost:5000/public/images/" + req.file.originalname,
    })
      .then(() => {
        return res.render("blog/addblog", { possibleErrors });
      })
      .catch(() => console.log("error occured"));
  } else {
    errors = errors.errors;
    console.log(errors);
    errors.forEach((e) => {
      possibleErrors[e.path] = e.msg;
    });
    res.render("blog/addblog", { possibleErrors });
  }
};

exports.getAddBlog = (req, res, next) => {
  return res.render("blog/addblog", {
    possibleErrors: { title: "", description: "" },
  });
};

exports.getAllBlog = async (req, res, next) => {
  const blogs = await Blog.findAll();
  res.render("blog/displayblog", { blogs });
};

exports.getDeleteBlog = (req, res, next) => {
  const id = req.params.id;
  Blog.destroy({
    where: {
      id,
    },
  })
    .then(() => res.redirect("/blogs"))
    .catch(() => res.status(400).send("failed"));
};

exports.getEditBlog = (req, res, next) => {
  const id = req.params.id;
  Blog.findByPk(id).then((blog) => {
    res.render("blog/editblog", {
      blog,
      possibleErrors: { title: "", description: "" },
    });
  });
};
exports.postEditBlog = async (req, res, next) => {
  const blog = await Blog.findByPk(req.body.id);
  blog.title = req.body.title;
  blog.description = req.body.description;
  blog.imageUrl =
    "http://localhost:5000/public/images/" + req.file.originalname;

  blog
    .save()
    .then(() => {
      return res.redirect("/blogs");
    })
    .catch(() => {
      res.render("blogs/editblog");
    });
};
