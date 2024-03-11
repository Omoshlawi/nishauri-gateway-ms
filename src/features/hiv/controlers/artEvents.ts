import { NextFunction, Request, Response } from "express";
import { artEventsRepo } from "../repositories";
import { z } from "zod";

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

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.id).success) {
      throw { status: 404, errors: { detail: "ART event not found" } };
    }

    const results = await artEventsRepo.updateById(
      req.params.id,
      req.body,
      req.header("x-access-token")
    );
    return res.json(results);
  } catch (error) {
    next(error);
  }
};
