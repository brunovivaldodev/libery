import { Router } from "express";
import { CreateManagerController } from "../controllers";

const managerRoutes = Router();

const createManagerController = new CreateManagerController();

managerRoutes.post("/", createManagerController.handle);

export { managerRoutes };
