const express = require("express");
const productController = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.get(
  "/product",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.getAllProducts
);
router.post("/product", isAuthenticatedUser, productController.createProduct);
router.put(
  "/product/:id",
  isAuthenticatedUser,
  productController.updateProduct
);
router.delete(
  "/product/:id",
  isAuthenticatedUser,
  productController.deleteProduct
);
router.get("/product/:id", productController.getSingleProduct);

module.exports = router;
