const express = require("express");

const serviceApiController = require("./../controllers/ServiceApi");

const router = express.Router();

router.get("/", serviceApiController.getApiAllService);
router.get("/:id", serviceApiController.getApiServiceById);

module.exports = router;
