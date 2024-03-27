import { Router } from "express";
import { getUser, login, signUp } from "../controllers/authController";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/authMiddleware";

const authRoutes:Router = Router();

authRoutes.post('/register', errorHandler(signUp));
authRoutes.post('/login', errorHandler(login));
authRoutes.get('/me', [authMiddleware], errorHandler(getUser));

export default authRoutes;