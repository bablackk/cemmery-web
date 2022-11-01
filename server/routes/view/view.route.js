const router = require("express").Router();

const viewController = require("../../controllers/view/view.controller");

router.get("/", viewController.homePage);

router.get("/product", viewController.getAllProducts);

module.exports = router;
