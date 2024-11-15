import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const authRouter = Router();
const authController = new AuthController;

authRouter.post("/register", authController.signup );
authRouter.post("/login", authController.signin);

export default authRouter