import { Router } from "express";
import { product_schema } from "../middlewares/index.js";
import { ProductsController } from "../controllers/index.js";

const router = Router();

router.route("/")
        .get(ProductsController.index)
        .post(product_schema, ProductsController.create);

router.route("/:id")
        .get(ProductsController.show)
        .put(product_schema, ProductsController.update)
        .patch(product_schema, ProductsController.update)
        .delete(ProductsController.destroy);

export default router;