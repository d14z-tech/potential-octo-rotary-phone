import { Router } from "express";
import { SignUpJoiSchema, SignInJoiSchema } from "../middlewares/index.js";
import { AuthenticationController, EndpointsController } from "../controllers/index.js";
import products from "./product_routes.js";
import users from "./user_routes.js";

const router = Router();
const api = Router();
const v1 = Router();

v1
  .post("/sign_up", SignUpJoiSchema, AuthenticationController.sign_up)
  .post("/sign_in", SignInJoiSchema, AuthenticationController.sign_in)
  .use("/products", products)
  .use("/users", users);

api
  .use('/v1', v1);

router
  .get("/", EndpointsController.welcome)
  .get("/health_check", EndpointsController.health_check)
  .use("/api", api);

export default router;
