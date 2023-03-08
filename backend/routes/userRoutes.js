const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/password/reset", userController.forgotPassword);
router.put("/password/reset/:token", userController.resetPassword);
router.get("/logout", userController.logoutUser);
module.exports = router;
