const router = require("express").Router();
const productController = require("../../controllers/admin/product.controller");
const authController = require("../../controllers/auth.controller");
// ROUTE PRODUCT
router.post("/product", productController.product);
router.get(
  "/products",
  // authController.protect,
  productController.getAllProducts
);
router.get("/product/:id", productController.getProduct);

module.exports = router;
