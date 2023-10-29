const express = require("express");
const router = express.Router();
const clienteleController = require("./../controllers/Clientele");

router.get("/", clienteleController.getAllClientele);
router.get("/add-clientele", clienteleController.getAddClientele);
router.post("/add-clientele", clienteleController.postAddClientele);
router.get("/delete-clientele/:id", clienteleController.getDeleteClientele);

module.exports = router;
