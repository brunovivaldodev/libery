import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "../../application/exceptions";
import routes from "../../../infra/http/routes";

const app = express();

app.use(express.json());

app.use("/", routes);

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
        status: err.statusCode,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Error Server -${err.stack}`,
    });
  }
);

export { app };
