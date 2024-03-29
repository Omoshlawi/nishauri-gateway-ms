import { NextFunction, Request, Response } from "express";
import { ordersRepo } from "../repositories";

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await ordersRepo.findAll(req.header("x-access-token"));
    return res.json(results);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await ordersRepo.create(
      req.body,
      req.header("x-access-token")
    );
    return res.json(results);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await ordersRepo.findOneById(
      req.params.id,
      req.header("x-access-token")
    );
    return res.json(results);
  } catch (error) {
    next(error);
  }
};
