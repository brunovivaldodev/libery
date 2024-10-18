import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "../config";

type JsonPayload = {
  id: string;
  name: string;
};

export function ensureManagerAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessTokenHeader = req.headers.authorization as string;

  const [, accessToken] = accessTokenHeader.split(" ");

  if (!accessToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const decoded = verify(accessToken, authConfig.secretToken) as JsonPayload;
    req.manager = {
      id: decoded.id,
      name: decoded.name,
    };
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
}
