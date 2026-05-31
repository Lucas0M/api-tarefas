import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ erro: "Token not allowed!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Invalid Token!" });
  }
}
