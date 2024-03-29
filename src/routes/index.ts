import { Router } from "express";
import authRoutes from "./auth";
import productsRouter from "./products";
import usersRouter from "./users";

const rootRouter = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productsRouter);
rootRouter.use('/products', productsRouter);
rootRouter.use('/address', usersRouter);

export default rootRouter;