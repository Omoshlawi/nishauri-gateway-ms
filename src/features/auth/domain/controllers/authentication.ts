import { NextFunction, Request, Response } from "express";
import LoginSchema from "../../presentation/LoginSchema";
import bcrypt from "bcrypt";
import { RegisterSchema } from "../../presentation";
import { omit } from "lodash";
import { Person, User } from "../../data/models";
import { formartError } from "../../../../utils";
import { authRepository } from "../../data/respositories";
import { APIException } from "../../../../shared/exceprions";
import { UserRequest } from "../../../../shared/types";
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // let user = User.findOne({email})
  try {
    const validation = await RegisterSchema.safeParseAsync(req.body);
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    const user = await authRepository.registerUser(validation.data);
    const { accessToken, refreshToken } = user.generateAuthToken();
    return res
      .header("x-refresh-token", refreshToken)
      .header("x-access-token", accessToken)
      .json({ user, token: user.generateAuthToken() });
  } catch (error: any) {
    next(error);
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // let user = User.findOne({email})
  try {
    const validation = await LoginSchema.safeParseAsync(req.body);
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    const user = await authRepository.loginUser(validation.data);
    const { accessToken, refreshToken } = user.generateAuthToken();

    return res
      .header("x-refresh-token", refreshToken)
      .header("x-access-token", accessToken)
      .json({ user, token: user.generateAuthToken() });
  } catch (error: any) {
    next(error);
  }
};

export const refreshToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken, refreshToken } = req.user.generateAuthToken();
    return res
      .header("x-refresh-token", refreshToken)
      .header("x-access-token", accessToken)
      .json({ user: req.user, token: req.user.generateAuthToken() });
  } catch (err) {
    next(err);
  }
};
