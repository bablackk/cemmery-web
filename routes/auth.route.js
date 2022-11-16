const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.registerUser);
router.post("/login", authController.protect, authController.loginUser);

module.exports = router;
