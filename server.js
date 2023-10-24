const express = require("express");
const path = require("path");
const multer = require("multer");
const session = require("express-session");

const authRoutes = require("./routes/Auth");
const blogRoutes = require("./routes/Blog");
const blogApiRoutes = require("./routes/BlogApi");
const serviceRoutes = require("./routes/Service");
const serviceApiRoutes = require("./routes/ServiceApi");

const app = express();

app.use(
  session({
    secret: "demoskey",
    resave: false,
    saveUninitialized: false,
  })
);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "public/images");
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }).single("imageUrl")
);

app.use(["/login", "/users"], authRoutes);
app.use((req, res, next) => {
  if (req.url != undefined && req.url !== "/favicon.ico")
    req.session.currentUrl = req.url;
  if (!req.session.isLoggedIn) {
    return res.render("auth/login", { error: false });
  }
  next();
});
app.use("/api/blogs", blogApiRoutes);
app.use("/blogs", blogRoutes);
app.use("/api/services", serviceApiRoutes);
app.use("/services", serviceRoutes);
app.get(["/dashboard", "/"], (req, res, next) => {
  res.render("dashboard");
});
app.use("/", (req, res, next) => {
  res.render("404");
});

app.listen(5000);
