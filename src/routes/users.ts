import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../error-handler";
import { addAddress, deleteAddress, getAddress, listAddress, updateAddress } from "../controllers/userController";

const usersRouter = Router();

usersRouter.post('/', [authMiddleware], errorHandler(addAddress));
usersRouter.delete('/:id', [authMiddleware], errorHandler(deleteAddress));
usersRouter.get('/', [authMiddleware], errorHandler(listAddress));
usersRouter.get('/:id', [authMiddleware], errorHandler(getAddress));
usersRouter.put('/:id', [authMiddleware], errorHandler(updateAddress));

export default usersRouter;