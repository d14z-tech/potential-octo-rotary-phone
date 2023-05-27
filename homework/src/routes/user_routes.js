import { Router } from "express";
import { Auth, UserJoiSchema } from "../middlewares/index.js";
import { UsersController } from "../controllers/index.js";

const router = Router();
const private_router = Router();

private_router.use(Auth);

private_router.route("/")
                .get(UsersController.index)
                .post(UserJoiSchema, UsersController.create);

private_router.route("/:id")
                .get(UsersController.show)
                .put(UserJoiSchema, UsersController.update)
                .patch(UserJoiSchema, UsersController.update)
                .delete(UsersController.destroy);

router.use(private_router);

export default router;