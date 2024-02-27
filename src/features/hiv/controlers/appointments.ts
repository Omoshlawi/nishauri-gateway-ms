import { NextFunction, Request, Response } from "express";
import { appointmentRepo } from "../repositories";

export const getAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await appointmentRepo.findAll(req.header("x-access-token"));
    return res.json(results);
  } catch (error) {
    next(error);
  }
};

export const getAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await appointmentRepo.findOneById(
      req.params.id,
      req.header("x-access-token")
    );
    return res.json(results);
  } catch (error) {
    next(error);
  }
};
