import { Router } from "express";
import { login, signUp } from "../controllers/authController";
import { errorHandler } from "../error-handler";

const authRoutes:Router = Router();

authRoutes.post('/register', errorHandler(signUp));
authRoutes.post('/login', errorHandler(login));

export default authRoutes;