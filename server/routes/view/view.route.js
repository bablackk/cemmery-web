const router = require("express").Router();
const viewController = require("../../controllers/view/view.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.get("/", authMiddleware.requireAuth, viewController.homePage);

router.get(
  "/products",
  authMiddleware.requireAuth,
  viewController.getAllProducts
);
router.get(
  "/products/tops",
  authMiddleware.requireAuth,
  viewController.getTopsProduct
);
router.get(
  "/products/bottom",
  authMiddleware.requireAuth,
  viewController.getBottomProduct
);
router.get(
  "/products/outerwear",
  authMiddleware.requireAuth,
  viewController.getOuterwearProduct
);
router.get(
  "/product/:id",
  authMiddleware.requireAuth,
  viewController.getProduct
);
router
  .route("/login")
  .get(viewController.login)
  .post(viewController.loginHandle); // client
router
  .route("/register")
  .get(viewController.register)
  .post(viewController.registerHandle);
router.get("/logout", viewController.logoutHandle);
router.get("/cart", authMiddleware.requireAuth, viewController.cart);
router.get("/admin", authMiddleware.requireAuth, viewController.adminPage);
router
  .route("/payment")
  .get(authMiddleware.requireAuth, viewController.checkout)
  .post(viewController.handleCheckout);

router.get("/profile", authMiddleware.requireAuth, viewController.profile);
router.get("/search:productName", viewController.search);
router.get("/payment/thanks", viewController.thanks);

//ADMIN PANEL

router.get("/admin/products", viewController.renderProduct);
router
  .route("/admin/product/add")
  .get(viewController.renderPageAddProduct)
  .post(viewController.AdminAddProducts);

router.get(
  "/admin/profile/:id",
  authMiddleware.requireAuth,
  viewController.AdminProfile
);

router.get(
  "/admin/orders",
  authMiddleware.requireAuth,
  viewController.AdminOrder
);
router.get("/admin/users", authMiddleware.requireAuth, viewController.AllUser);
module.exports = router;
