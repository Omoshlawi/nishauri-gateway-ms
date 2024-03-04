import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../shared/types";
import { authRepo } from "../features/auth/repositories";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const cookieToken = JSON.parse(req.cookies["session-token"] ?? null);
  const cookieToken = req.cookies?.["session-token"];
  const token = req.header("x-access-token") ?? cookieToken;
  if (!token)
    return res.status(401).json({ detail: "Unauthorized - Token missing" });
  try {
    const user = await authRepo.getUserByToken(token);
    (req as UserRequest).user = user;
    return next();
  } catch (err: any) {
    next(err);
  }
};

export default authenticate;
