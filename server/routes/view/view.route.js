const router = require("express").Router();
const viewController = require("../../controllers/view/view.controller");

router.get("/", viewController.homePage);

router.get("/products", viewController.getAllProducts);
router.get("/products/tops", viewController.getTopsProduct);
router.get("/products/bottom", viewController.getBottomProduct);
router.get("/products/outerwear", viewController.getOuterwearProduct);
router.get("/product/:id", viewController.getProduct);

module.exports = router;
