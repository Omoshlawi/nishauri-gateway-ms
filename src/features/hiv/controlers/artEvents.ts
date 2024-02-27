import { NextFunction, Request, Response } from "express";
import { artEventsRepo } from "../repositories";

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await artEventsRepo.findAll(req.header("x-access-token"));
    return res.json(results);
  } catch (error) {
    next(error);
  }
};

export const createEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await artEventsRepo.create(
      req.body,
      req.header("x-access-token")
    );
    return res.json(results);
  } catch (error) {
    next(error);
  }
};
