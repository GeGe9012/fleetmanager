import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export default function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Something failed!",
    statusCode,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}
