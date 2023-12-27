import { NextFunction, Request, Response } from "express";
import { authRepository, userRepository } from "../../data/respositories";
import { APIException } from "../../../../shared/exceprions";
import { UserRequest } from "../../../../shared/types";
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // let user = User.findOne({email})
  try {
    const user = await authRepository.registerUser(req.body);
    return res.json(user);
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
    const user = await authRepository.loginUser(req.body);
    return res.json(user);
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

export const verifyAccount = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await authRepository.verifyUserAccount(req.user._id, req.body);

    return res.json({ detail: "Verification successfull" });
  } catch (error) {
    next(error);
  }
};

export const requestVerificationCode = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({ detail: "Password changed successfully!" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
