const router = require("express").Router();
const productController = require("../../controllers/admin/product.controller");

router.post("/product", productController.product);
router.get("/products", productController.getAllProduct);

module.exports = router;
