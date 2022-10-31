const router = require("express").Router();
const productController = require("../../controllers/admin/product.controller");
// ROUTE PRODUCT
router.post("/product", productController.product);
router.get("/products", productController.getAllProducts);
router.get("/product/:id", productController.getProduct);

module.exports = router;
