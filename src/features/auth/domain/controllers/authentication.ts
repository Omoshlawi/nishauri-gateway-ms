import { NextFunction, Request, Response } from "express";
import LoginSchema from "../../presentation/LoginSchema";
import bcrypt from "bcrypt";
import { RegisterSchema } from "../../presentation";
import { omit } from "lodash";
import { Person, User } from "../../data/models";
import { formartError } from "../../../../utils";
import { authRepository } from "../../data/respositories";
import { APIException } from "../../../../shared/exceprions";
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
    return res
      .header("x-auth-token", user.generateAuthToken())
      .json({ user, token: user.generateAuthToken() });
  } catch (error: any) {
    next(error);
  }
};
