const { Router } = require("express");
const router = Router();

router
    .use("/v1/users", require("./users"));

module.exports = router;