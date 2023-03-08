const express = require("express");
const productController = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.get("/product", productController.getAllProducts);
router.post(
  "/product",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.createProduct
);
router.put(
  "/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.updateProduct
);
router.delete(
  "/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.deleteProduct
);
router.get("/product/:id", productController.getSingleProduct);

module.exports = router;
