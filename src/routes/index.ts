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
rootRouter.use('/', usersRouter);
rootRouter.use('/cart', cartRoutes);
rootRouter.use('/order', orderRouters);

export default rootRouter;

/*
    TODO:
    1. order management
        a. list all orders (filter on status)
        b. change order status
    2. product management
        a. search api for products (for both users and admins) -> full text search
*/