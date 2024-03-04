import { NextFunction, Request, Response } from "express";
import { OAUTH_REDIRECT_URL, getProfileInfo, getToken } from "../../../utils";
import { authRepo } from "../repositories";

export const googleSignInCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.code)
      throw {
        status: 401,
        errors: { detail: "Unauthorized - Error authenticating with google" },
      };
    const user_ = await authRepo.googleSignin(req.query);
    res
      .cookie("session-token", user_.token.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
        secure: process.env.NODE_ENV === "production",
      })
      .setHeader("x-refresh-token", user_.token.refreshToken)
      .setHeader("x-access-token", user_.token.accessToken)
      .redirect(`${OAUTH_REDIRECT_URL}/api/auth/callback`);
  } catch (e: any) {
    next(e);
  }
};
