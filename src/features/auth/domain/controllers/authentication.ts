import { NextFunction, Request, Response } from "express";
import { authRepository } from "../../data/respositories";
import { UserRequest } from "../../../../shared/types";
import AuthRepository from "../../data/respositories/AuthRepository";
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // let user = User.findOne({email})
  try {
    const user = await authRepository.registerUser(req.body);
    return res
      .header("x-refresh-token", user.token.refreshToken)
      .header("x-access-token", user.token.accessToken)
      .json(user);
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
    return res
      .header("x-refresh-token", user.token.refreshToken)
      .header("x-access-token", user.token.accessToken)
      .json(user);
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
    const user = await AuthRepository.refreshToken(
      req.header("x-refresh-token") as string
    );
    return res
      .header("x-refresh-token", user.token.refreshToken)
      .header("x-access-token", user.token.accessToken)
      .json(user);
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
    await authRepository.verifyUserAccount(
      req.header("x-access-token") as string,
      req.body
    );
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
    const response = await authRepository.getOrCreateAccountVerification(
      req.header("x-access-token") as string,
      req.query.mode
    );
    return res.json(response);
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
