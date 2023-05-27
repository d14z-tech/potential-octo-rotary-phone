import { Router } from "express";
import { Auth, ProductJoiSchema } from "../middlewares/index.js";
import { ProductsController } from "../controllers/index.js";

const router = Router();
const private_router = Router();

private_router.use(Auth);

private_router.route("/")
                .get(ProductsController.index)
                .post(ProductJoiSchema, ProductsController.create);

private_router.route("/:id")
                .get(ProductsController.show)
                .put(ProductJoiSchema, ProductsController.update)
                .patch(ProductJoiSchema, ProductsController.update)
                .delete(ProductsController.destroy);
                
router.use(private_router);

export default router;