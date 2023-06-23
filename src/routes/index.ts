import productRoutes from "./product.routes";
import userRoutes from "./user.routes";

import { Router } from "express";

const routes = Router();

routes.use("/", userRoutes);
routes.use("/product", productRoutes);

export default routes;
