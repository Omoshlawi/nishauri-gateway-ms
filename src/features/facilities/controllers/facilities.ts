import { NextFunction, Request, Response } from "express";
import { facilitiesRepository } from "../repositories";
import { expressMulterFileToFile, objectToFormData } from "../../../utils";

export const getFacilities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const facilities = await facilitiesRepository.getFacilities(req.query);
    return res.json(facilities);
  } catch (error) {
    next(error);
  }
};

export const createFacility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = {
      ...req.body,
      images: ((req.files as Express.Multer.File[] | undefined) ?? []).map(
        expressMulterFileToFile
      ),
    };

    const formData = objectToFormData(body);
    return res.json(
      await facilitiesRepository.registerFacility(
        formData,
        req.header("x-access-token") ?? ""
      )
    );
  } catch (error) {
    next(error);
  }
};
