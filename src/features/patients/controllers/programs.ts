import { NextFunction, Request, Response } from "express";
import { programsRepository } from "../repositories";

export const getPrograms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await programsRepository.getPrograms());
  } catch (error) {
    next(error);
  }
};
export const addPrograms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(
      await programsRepository.addProgram(
        req.body,
        req.header("x-access-token") ?? ""
      )
    );
  } catch (error) {
    next(error);
  }
};
export const updatePrograms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(
      await programsRepository.updateProgram(
        req.params.id,
        req.body,
        req.header("x-access-token") ?? ""
      )
    );
  } catch (error) {
    next(error);
  }
};
export const deletePrograms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(
      await programsRepository.deleteProgram(
        req.params.id,
        req.header("x-access-token") ?? ""
      )
    );
  } catch (error) {
    next(error);
  }
};
