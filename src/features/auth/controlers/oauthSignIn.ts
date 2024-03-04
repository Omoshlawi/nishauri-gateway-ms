import { NextFunction, Request, Response } from "express";
import { getGoogleAuthUrl } from "../../../utils";

export const googleSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url = getGoogleAuthUrl();
    // const uri = new URL(url);
    // uri.searchParams.set(
    //   "callbackUrl",
    //   (req.query.callbackUrl ?? "") as string
    // );
    return res.redirect(url);
  } catch (e: any) {
    res.status(401).json({ detail: e.message });
  }
};
