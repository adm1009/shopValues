const shopDetailsController = require("../controller/shopDetailsController.js");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/checkAuth");

router.get("/shop",verifyToken,shopDetailsController.shopDetails);

module.exports = router;