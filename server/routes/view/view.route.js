const router = require("express").Router();
const viewController = require("../../controllers/view/view.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.get("/", viewController.homePage);

router.get("/products", viewController.getAllProducts);
router.get("/products/tops", viewController.getTopsProduct);
router.get("/products/bottom", viewController.getBottomProduct);
router.get("/products/outerwear", viewController.getOuterwearProduct);
router.get("/product/:id", viewController.getProduct);
router
  .route("/login")
  .get(viewController.login)
  .post(viewController.loginHandle);
router
  .route("/register")
  .get(viewController.register)
  .post(viewController.registerHandle);
router.get("/logout", viewController.logoutHandle);
router.get("/cart", viewController.cart);
router.get("/admin_panel", viewController.admin_panel);
router
  .route("/payment")
  .get(viewController.checkout)
  .post(viewController.handleCheckout);

module.exports = router;
