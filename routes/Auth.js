const express = require("express");
const authController = require("./../controllers/Auth");

const router = express.Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.getLogout);
router.get("/add-user", authController.getAddUser);
router.post("/add-user", authController.postAddUser);
router.get("/delete-user", authController.getDeleteUser);
router.post("/delete-user", authController.postDeleteUser);

module.exports = router;
