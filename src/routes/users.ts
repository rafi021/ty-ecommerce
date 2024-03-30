import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../error-handler";
import { addAddress, changeUserRole, deleteAddress, getAddress, getUserById, listAddress, listUsers, updateAddress, updateUser } from "../controllers/userController";

const usersRouter = Router();

usersRouter.post('/addrees', [authMiddleware], errorHandler(addAddress));
usersRouter.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress));
usersRouter.get('/address', [authMiddleware], errorHandler(listAddress));
usersRouter.get('/address/:id', [authMiddleware], errorHandler(getAddress));
usersRouter.put('/address/:id', [authMiddleware], errorHandler(updateAddress));
usersRouter.post('/address/user', [authMiddleware], errorHandler(updateUser));

usersRouter.get('/users', [authMiddleware], errorHandler(listUsers));
usersRouter.get('/users/:id', [authMiddleware], errorHandler(getUserById));
usersRouter.put('/users/role-change/:id', [authMiddleware], errorHandler(changeUserRole));

export default usersRouter;