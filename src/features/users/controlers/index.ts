import { NextFunction, Request, Response } from "express";
import { userRepo } from "../repositories";
import { UserRequest } from "../../../shared/types";
import { APIException } from "../../../shared/exceprions";
import { z } from "zod";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userRepo.findAll(
      req.header("x-access-token") as string
    );
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "User not found" } };
    }
    const users = await userRepo.findOneById(
      req.params.id,
      req.header("x-access-token") as string
    );
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

export const viewProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json((req as UserRequest).user);
  } catch (error) {
    next(error);
  }
};
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formData = new FormData();

    let image = req.file;
    Object.entries(req.body).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof Array) {
          value.forEach((val, index) =>
            formData.append(`${key}[${index}]`, val)
          );
        } else formData.append(key, value as string);
      }
    });
    if (image) {
      const uint8Array = Uint8Array.from(image.buffer);
      const blob = new Blob([uint8Array], { type: image.mimetype });
      const file = new File([blob], image.originalname, { type: blob.type });
      formData.append("image", file, image.originalname);
    }
    const user = await userRepo.updateUserProfile(
      req.header("x-access-token") as string,
      formData
    );
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "User not found" } };
    }
    const user = await userRepo.deleteById(
      req.params.id,
      req.header("x-access-token") as string
    );
    return res.json(user);
  } catch (error) {
    next(error);
  }
};
