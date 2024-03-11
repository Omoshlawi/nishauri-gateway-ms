import { NextFunction, Request, Response } from "express";
import { artGroupRepo } from "../repositories";
import { z } from "zod";

export const getGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await artGroupRepo.findAll(req.header("x-access-token"));
    return res.json(results);
  } catch (error) {
    next(error);
  }
};

export const getMyGroupEnrollments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log((req as any).user);
    const results = await artGroupRepo.findUseGroupEnrollments(
      req.header("x-access-token")
    );
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
    const group = await artGroupRepo.create(
      req.body,
      req.header("x-access-token")
    );
    return res.json(group);
  } catch (error) {
    next(error);
  }
};

export const updateGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!z.string().uuid().safeParse(req.params.id).success) {
      throw { status: 404, errors: { detail: "ART Group not found" } };
    }
    const group = await artGroupRepo.updateById(
      req.params.id,
      req.body,
      req.header("x-access-token")
    );
    return res.json(group);
  } catch (error) {
    next(error);
  }
};
