import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { patientProgramRepository } from "../repositories";
import { APIException } from "../../../shared/exceprions";
import { UserRequest } from "../../../shared/types";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await patientProgramRepository.registerForProgram(
      (req as UserRequest).user._id,
      req.body,
      req.header("x-access-token") as string
    );
    return res.json(response);
  } catch (error) {
    next(error);
  }
};
export const requestVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await patientProgramRepository.requestVerification(
      (req as UserRequest).user._id,
      req.query,
      req.header("x-access-token") as string
    );
    return res.json(response);
  } catch (error) {
    next(error);
  }
};
export const getRegisteredPrograms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(
      await patientProgramRepository.getPatientPrograms(
        (req as UserRequest).user._id
      )
    );
  } catch (error) {
    next(error);
  }
};
export const verifyProgramRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await patientProgramRepository.verifyProgramRegistration(
      (req as UserRequest).user._id,
      req.body,
      req.header("x-access-token") as string
    );
    return res.json(response);
  } catch (error) {
    next(error);
  }
};
