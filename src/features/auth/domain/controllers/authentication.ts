import { NextFunction, Request, Response } from "express";
import LoginSchema from "../../presentation/LoginSchema";
import bcrypt from "bcrypt";
import { AccountVerificationSchema, RegisterSchema } from "../../presentation";
import { omit, template } from "lodash";
import { Person, User } from "../../data/models";
import { formartError } from "../../../../utils";
import { authRepository, userRepository } from "../../data/respositories";
import { APIException } from "../../../../shared/exceprions";
import { UserRequest } from "../../../../shared/types";
import config from "config";
import { generateOTP, parseMessage, sendSms } from "../../../../utils/helpers";
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

export const verifyAccount = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const validation = await AccountVerificationSchema.safeParseAsync(req.body);
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    await authRepository.verifyUserAccount(req.user._id, validation.data);

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
    const modes = ["sms", "watsapp", "email"];
    const mode: "sms" | "watsapp" | "email" = modes.includes(
      req.query.mode as any
    )
      ? (req.params.mode as any)
      : "sms";

    const { otp: code } = await authRepository.getOrCreateAccountVerification(
      req.user._id,
      mode
    );
    const person = await userRepository.getPersonByUserId(req.user._id);

    const messageTemplate: string = config.get("sms.OTP_SMS");

    const parsedMessage = parseMessage({ code }, messageTemplate);
    sendSms(parsedMessage, person!.phoneNumber);
    return res.json({
      detail: `OTP sent to ${mode} ${person?.email} ${person?.phoneNumber} successfully`,
    });
  } catch (error) {
    next(error);
  }
};
