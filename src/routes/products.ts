import { errorHandler } from './../error-handler';
import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/productController";
import authMiddleware from '../middlewares/authMiddleware';
import adminMiddleware from '../middlewares/admin';
const productsRouter:Router = Router();

productsRouter.get('/', [authMiddleware, adminMiddleware], errorHandler(getAllProducts));
productsRouter.post('/', [authMiddleware, adminMiddleware],errorHandler(createProduct));
productsRouter.get('/:id', [authMiddleware, adminMiddleware], errorHandler(getProduct));
productsRouter.put('/:id', [authMiddleware, adminMiddleware], updateProduct);
productsRouter.delete('/:id', [authMiddleware, adminMiddleware], deleteProduct);

export default productsRouter;