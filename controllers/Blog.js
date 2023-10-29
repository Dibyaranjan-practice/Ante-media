const path = require("path");
const { validationResult } = require("express-validator");
const Blog = require("./../models/Blog");
const deleteFile = require("./../utils/deleteFile");

exports.getAddBlog = (req, res, next) => {
  return res.render("blog/addblog", {
    possibleErrors: { title: "", description: "" },
    pageName: "Add Blog",
  });
};
exports.postAddBlog = (req, res, next) => {
  const possibleErrors = { title: "", description: "" };
  let errors = validationResult(req);
  if (errors.isEmpty()) {
    Blog.create({
      title: req.body.title,
      description: req.body.description,
      imageUrl: path.join(
        process.env.DOMAIN_PATH,
        "public",
        "images",
        req.file.filename
      ),
    })
      .then(() => {
        return res.render("blog/addblog", { possibleErrors });
      })
      .catch(() => res.send("error occured"));
  } else {
    errors = errors.errors;
    errors.forEach((e) => {
      possibleErrors[e.path] = e.msg;
    });
    res.render("blog/addblog", { possibleErrors });
  }
};

exports.getEditBlog = (req, res, next) => {
  const id = req.params.id;
  Blog.findByPk(id)
    .then((blog) => {
      res.render("blog/editblog", {
        blog,
        possibleErrors: { title: "", description: "" },
      });
    })
    .catch(() => res.send("Some error occured"));
};
exports.postEditBlog = async (req, res, next) => {
  const blog = await Blog.findByPk(req.body.id);
  if (blog) {
    const imageURL = blog.imageUrl;
    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.imageUrl = path.join(
      process.env.DOMAIN_PATH,
      "public",
      "images",
      req.file.filename
    );
    return blog
      .save()
      .then(() => {
        deleteFile(imageURL);
        return res.redirect("/blogs");
      })
      .catch(() => {
        res.send("some error occured");
      });
  }

  res.send("This product doesn't exists");
};

exports.getDeleteBlog = async (req, res, next) => {
  const id = req.params.id;
  Blog.findByPk(id).then((blog) => {
    const imageURL = blog.imageUrl;
    Blog.destroy({
      where: {
        id,
      },
    })
      .then(() => {
        console.log(imageURL);
        deleteFile(imageURL);
        res.redirect("/blogs");
      })
      .catch(() => res.status(400).send("failed"));
  });
};

exports.getAllBlog = async (req, res, next) => {
  const blogs = await Blog.findAll();
  res.render("blog/displayblog", { blogs });
};
