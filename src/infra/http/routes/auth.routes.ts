import { Router } from "express";
import { AuthenticateManagerController } from "../controllers";

const authRoutes = Router();

const authenticateManagerController = new AuthenticateManagerController();

authRoutes.post("/", authenticateManagerController.handle);

export { authRoutes };
