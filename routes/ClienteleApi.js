const express = require("express");
const clienteleApiController = require("./../controllers/ClienteleApi");

const router = express.Router();

router.get("/", clienteleApiController.getApiAllClientele);
router.get("/:id", clienteleApiController.getApiClienteleById);

module.exports = router;
