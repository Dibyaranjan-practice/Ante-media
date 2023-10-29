const bcrypt = require("bcryptjs");
const User = require("./../models/Auth");

exports.getLogin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.render("dashboard");
  }
  res.render("auth/login", { error: false });
};

exports.postLogin = async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (!user) {
    return res.render("auth/login", { error: true });
  }
  if (await bcrypt.compare(req.body.password, user.password)) {
    req.session.isLoggedIn = true;
    req.session.username = req.body.username;
    res.redirect(
      req.session.currentUrl == ""
        ? "/dashboard"
        : req.session.currentUrl
        ? req.session.currentUrl
        : "/dashboard"
    );
  } else {
    res.render("auth/login", { error: true });
  }
};

exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/auth/login");
};

exports.getAddUser = (req, res, next) => {
  res.render("auth/add-user", { error: false, success: false });
};

exports.postAddUser = async (req, res, next) => {
  const user = await User.findByPk(req.body.username);
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

exports.getDeleteUser = async (req, res, next) => {
  const username = req.params.username;
  if (req.session.username == username) {
    return res.send("You can't delete account that you're currently Using");
  }
  const user = await User.findByPk(username);
  if (user) {
    user
      .destroy()
      .then(() => {
        return res.redirect("/users");
      })
      .catch(() => res.send("Some error occured"));
  } else {
    res.send("User doesn't exists");
  }
};

exports.getAllUser = async (req, res, next) => {
  const users = await User.findAll();
  res.render("auth/displayusers", { users });
};
