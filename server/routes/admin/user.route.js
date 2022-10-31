const router = require("express").Router();

const userController = require("../../controllers/admin/user.controller");

router.get("/users", userController.getAllUsers);
router.get("/user/:id", userController.getUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
