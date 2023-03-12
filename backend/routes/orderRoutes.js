const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/order/:id", isAuthenticatedUser, orderController.getSingleOrder);
router.post("/neworder", isAuthenticatedUser, orderController.newOrder);
router.get("/orders/me", isAuthenticatedUser, orderController.myOrders);
router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderController.getAllOrders
);

router.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderController.updateOrder
);

router.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderController.deleteOrder
);

module.exports = router;
