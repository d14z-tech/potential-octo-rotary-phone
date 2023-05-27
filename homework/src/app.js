import express from "express";
import routes from "./routes/index.js";
import { PublicErrors, NotFound } from "./middlewares/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);
app.use(NotFound);
app.use(PublicErrors);

export default app;
