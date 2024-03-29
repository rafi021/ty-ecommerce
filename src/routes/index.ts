import { Router } from "express";
import authRoutes from "./auth";
import productsRouter from "./products";
import usersRouter from "./users";
import cartRoutes from "./cart";
import orderRouters from "./order";

const rootRouter = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productsRouter);
rootRouter.use('/products', productsRouter);
rootRouter.use('/address', usersRouter);
rootRouter.use('/cart', cartRoutes);
rootRouter.use('/order', orderRouters);

export default rootRouter;