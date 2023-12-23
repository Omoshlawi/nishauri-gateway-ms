import { NextFunction, Response } from "express";
import { UserRequest } from "../../../../shared/types";
import { userRepository } from "../../data/respositories";

export const profileView = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userRepository.getUserProfileById(req.user._id);
    return res.json(user[0]);
  } catch (error) {
    next(error);
  }
};
