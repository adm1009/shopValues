const userController = require("../controller/userController.js");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/checkAuth");

router.post("/register",userController.createUser);
router.post("/login",userController.loginController);
router.post("/logout",verifyToken,userController.logoutController);

module.exports = router;
