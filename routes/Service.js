const express = require("express");
const serviceController = require("./../controllers/Service");

const router = express.Router();

router.get("/", serviceController.getAllService);
router.get("/add-service", serviceController.getAddService);
router.post("/add-service", serviceController.postAddService);
router.get("/edit-service/:id", serviceController.getEditService);
router.post("/edit-service/:id", serviceController.postEditService);
router.get("/delete-service/:id", serviceController.getDeleteService);

module.exports = router;
