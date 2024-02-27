import { NextFunction, Request, Response } from "express";
import { treatmentSurportRepo } from "../repositories";

export const getTreatmentSuports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(
      await treatmentSurportRepo.findAll(req.header("x-access-token"))
    );
  } catch (error) {
    next(error);
  }
};
