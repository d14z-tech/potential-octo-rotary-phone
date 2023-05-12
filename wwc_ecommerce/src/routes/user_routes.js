import { Router } from "express";
import user_schema from "../middlewares/user_schema.js";
import { UsersController } from "../controllers/index.js";

const router = Router();

router.route("/")
        .get(UsersController.index)
        .post(user_schema, UsersController.create);

router.route("/:id")
        .get(UsersController.show)
        .put(user_schema, UsersController.update)
        .patch(user_schema, UsersController.update)
        .delete(UsersController.destroy);

export default router;