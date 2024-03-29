import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { errorHandler } from "../error-handler";
import { cancelOrder, createOrder, getOrderById, listOrder } from "../controllers/orderController";


const orderRouters = Router();

orderRouters.post('/', [authMiddleware], errorHandler(createOrder));
orderRouters.get('/', [authMiddleware], errorHandler(listOrder));
orderRouters.put('/:id/cancel', [authMiddleware], errorHandler(cancelOrder));
orderRouters.get('/:id', [authMiddleware], errorHandler(getOrderById));

export default orderRouters;