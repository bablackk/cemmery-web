const router = require("express").Router();

const userController = require("../../controllers/admin/user.controller");

router.get("/users", userController.getAllUser);

module.exports = router;
