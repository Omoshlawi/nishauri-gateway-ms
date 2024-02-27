import { NextFunction, Request, Response } from "express";
import { artGroupRepo } from "../repositories";

export const getGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await artGroupRepo.findAll();
    return res.json(results);
  } catch (error) {
    next(error);
  }
};

export const createGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const group = await artGroupRepo.create(req.body);
    return res.json(group);
  } catch (error) {
    next(error);
  }
};
