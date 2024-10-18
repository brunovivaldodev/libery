import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { managerRoutes } from "./manager.routes";
import { authorRoutes } from "./authors.routes";
import { bookRoutes } from "./books.routes";

const router = Router();

router.use("/managers", managerRoutes);
router.use("/authors", authorRoutes);
router.use("/books", bookRoutes);
router.use("/auth", authRoutes);

export default router;
