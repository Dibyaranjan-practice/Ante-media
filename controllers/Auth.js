const bcrypt = require("bcryptjs");
const User = require("./../models/Auth");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", { error: false });
};

exports.postLogin = async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (!user) {
    return res.render("auth/login", { error: true });
  }
  if (await bcrypt.compare(req.body.password, user.password)) {
    req.session.isLoggedIn = true;
    res.redirect(
      req.session.currentUrl == "" ? "/dashboard" : req.session.currentUrl
    );
  } else {
    res.render("auth/login", { error: true });
  }
};

exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/users/login");
};

exports.getAddUser = (req, res, next) => {
  res.render("auth/add-user", { error: false, success: false });
};

exports.postAddUser = async (req, res, next) => {
  const user = await User.findByPk(req.body.username);
  console.log(user);
  if (user) {
    return res.render("auth/add-user", { error: true, success: false });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  User.create({ username: req.body.username, password: hashedPassword })
    .then(() => {
      res.render("auth/add-user", { error: false, success: true });
    })
    .catch((error) => {
      res.render("auth/add-user", { error: true, success: false });
    });
};

exports.getDeleteUser = (req, res, next) => {
  res.render("auth/delete-user");
};

exports.postDeleteUser = (req, res, next) => {
  res.render("auth/delete-user");
};
