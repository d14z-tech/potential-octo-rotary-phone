import express from "express";
import routes from "./routes/index.js";
import { public_errors, not_found } from "./middlewares/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);
app.use(not_found);
app.use(public_errors);

export default app;
