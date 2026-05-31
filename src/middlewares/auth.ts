import { Request, Response, NextFunction } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token || token !== process.env.TOKEN_AUTH) {
    return res.status(401).json({ erro: "Not authorized!" });
  }

  next();
}
