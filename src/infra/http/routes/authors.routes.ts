import { Router } from "express";
import {
  CreateAuthorController,
  DeleteAuthorController,
  ListAuthorsController,
  ShowAuthorController,
  UpdateAuthorController,
} from "../controllers";
import { ensureManagerAuthenticate } from "../middlewares";

const authorRoutes = Router();

const createAuthorController = new CreateAuthorController();
const deleteAuthorController = new DeleteAuthorController();
const listAuthorsController = new ListAuthorsController();
const updateAuthorController = new UpdateAuthorController();
const showAuthorController = new ShowAuthorController();

authorRoutes.put(
  "/:id",
  ensureManagerAuthenticate,
  updateAuthorController.handle
);

authorRoutes.get("/", ensureManagerAuthenticate, listAuthorsController.handle);

authorRoutes.post(
  "/",
  ensureManagerAuthenticate,
  createAuthorController.handle
);

authorRoutes.delete(
  "/:id",
  ensureManagerAuthenticate,
  deleteAuthorController.handle
);

authorRoutes.get(
  "/:id",
  ensureManagerAuthenticate,
  showAuthorController.handle
);

export { authorRoutes };
