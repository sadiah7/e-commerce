const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/product", productController.getAllProducts);
router.post("/product", productController.createProduct);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);
router.get("/product/:id", productController.getSingleProduct);

module.exports = router;
