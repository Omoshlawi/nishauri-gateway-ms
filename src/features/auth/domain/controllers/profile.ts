import { NextFunction, Response } from "express";
import { UserRequest } from "../../../../shared/types";

export const profileView = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  return res.json({ profile: req.user });
};
