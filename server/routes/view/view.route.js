const router = require("express").Router();

const viewController = require("../../controllers/view/view.controller");

router.get("/", viewController.homePage);

router.get("/products", viewController.getAllProducts);
router.get("/product-tops", viewController.getTopsProduct);
router.get("/product-bottom", viewController.getBottomProduct);
router.get("/product-outerwear", viewController.getOuterwearProduct);

module.exports = router;
