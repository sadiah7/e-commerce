const express = require("express");
const productController = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.get("/product", productController.getAllProducts);

router.get("/allreviews", productController.getProductReviews);

router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.getAdminProducts
);
router.post(
  "/product",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.createProduct
);

router.put(
  "/review",
  isAuthenticatedUser,
  productController.createProductReview
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
router.delete(
  "/allreviews",
  isAuthenticatedUser,
  productController.deleteReview
);

router.get("/product/:id", productController.getSingleProduct);

module.exports = router;
