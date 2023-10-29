const express = require("express");
const authController = require("./../controllers/Auth");

const router = express.Router();

router.get("/", authController.getAllUser);
router.get("/add-user", authController.getAddUser);
router.post("/add-user", authController.postAddUser);
router.get("/delete-user/:username", authController.getDeleteUser);

module.exports = router;
