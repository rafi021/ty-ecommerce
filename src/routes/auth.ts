import { Router } from "express";
import { signUp } from "../controllers/authController";

const authRoutes:Router = Router();

authRoutes.post('/register', signUp);

export default authRoutes;