import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(err);

  if (err instanceof PrismaClientKnownRequestError) {
    // (P2025) not found
    if (err.code === "P2025") {
      return res.status(404).json({ erro: "Task not found!" });
    }
    if (err.code === "P2002") {
      return res.status(409).json({ erro: "Title task already exisits!" });
    }
  }

  const status: number = err.status || 500;
  const message: string = err.message || "Internal error from server";

  res.status(status).json({ erro: message });
}
