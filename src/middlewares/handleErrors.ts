import { NextFunction, Request, Response } from "express";
import logger from "../shared/logger";

export function handleErrors(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.status) {
    return res
      .status(error.status)
      .json(error.status === 400 ? { errors: error.errors } : error.errors);
  }
  // For other types of errors, return a generic error response
  logger.error("Error handler middleware: " + error.message);

  return res.status(500).json({ detail: "Internal Server Error" });
}

export default handleErrors;
