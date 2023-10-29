const express = require("express");
const authController = require("./../controllers/Auth");

const router = express.Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.getLogout);

module.exports = router;
