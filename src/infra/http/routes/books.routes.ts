import { Router } from "express";
import {
  CreateBookController,
  DeleteBookController,
  ListBooksController,
  ShowBookController,
  UpdateBookController,
} from "../controllers";
import { ensureManagerAuthenticate } from "../middlewares";

const bookRoutes = Router();

const createBookController = new CreateBookController();
const deleteBookController = new DeleteBookController();
const listBooksController = new ListBooksController();
const updateBookController = new UpdateBookController();
const showBookController = new ShowBookController();

bookRoutes.post("/", ensureManagerAuthenticate, createBookController.handle);

bookRoutes.delete(
  "/:id",
  ensureManagerAuthenticate,
  deleteBookController.handle
);

bookRoutes.get("/", ensureManagerAuthenticate, listBooksController.handle);

bookRoutes.put("/:id", ensureManagerAuthenticate, updateBookController.handle);

bookRoutes.get("/:id", ensureManagerAuthenticate, showBookController.handle);
export { bookRoutes };
