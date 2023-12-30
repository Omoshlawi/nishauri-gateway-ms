import { NextFunction, Request, Response } from "express";
import { facilityLevelsRepository } from "../repositories";

export const getFacilityLevels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const facilities = await facilityLevelsRepository.getFacilityLevels();
    return res.json(facilities);
  } catch (error) {
    next(error);
  }
};

export const createFacilityLevel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(
      await facilityLevelsRepository.registerFacility(
        req.body,
        req.header("x-access-token") ?? ""
      )
    );
  } catch (error) {
    next(error);
  }
};
