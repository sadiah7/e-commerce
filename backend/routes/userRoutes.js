const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/userdetails", isAuthenticatedUser, userController.getUserDetails);

router.put(
  "/userdetails/update",
  isAuthenticatedUser,
  userController.updateProfile
);

router.post("/password/reset", userController.forgotPassword);

router.put("/password/reset/:token", userController.resetPassword);

router.put(
  "/password/update",
  isAuthenticatedUser,
  userController.updatePassword
);

router.get("/logout", userController.logoutUser);

router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  userController.getAllUsers
);

router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  userController.getSingleUser
);

router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  userController.updateRole
);

router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  userController.deleteUser
);

module.exports = router;
