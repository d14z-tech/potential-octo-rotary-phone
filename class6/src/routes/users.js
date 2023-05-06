const { Router } = require("express");
const router = Router();
const UsersController = require("../controllers/user_controller");

router.route('/')
    .get(UsersController.index)
    .post(UsersController.create);

module.exports = router;