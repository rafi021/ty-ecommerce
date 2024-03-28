import { errorHandler } from './../error-handler';
import { Router } from "express";
import { createProduct, getAllProducts, getProduct } from "../controllers/productController";
import authMiddleware from '../middlewares/authMiddleware';
import adminMiddleware from '../middlewares/admin';
const productsRouter:Router = Router();

productsRouter.get('/', errorHandler(getAllProducts));
productsRouter.post('/', [authMiddleware, adminMiddleware],errorHandler(createProduct));
productsRouter.get('/:id', errorHandler(getProduct));
// productsRouter.put('/:id', updateProduct);
// productsRouter.get('/:id', getProduct);

export default productsRouter;