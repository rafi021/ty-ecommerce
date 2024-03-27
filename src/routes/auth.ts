import { Router } from "express";
import { login, signUp } from "../controllers/authController";

const authRoutes:Router = Router();

authRoutes.post('/register', signUp);
authRoutes.post('/login', login);

export default authRoutes;