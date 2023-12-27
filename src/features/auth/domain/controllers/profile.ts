import { NextFunction, Response, response } from "express";
import { UserRequest } from "../../../../shared/types";
import UserRepository from "../../data/respositories/UserRepository";
export const profileView = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    return res.json(user);
  } catch (error) {
    next(error);
  }
};
export const profileUpdate = async (
  req: UserRequest,
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
    const user = await UserRepository.updateUserProfile(
      req.header("x-access-token") as string,
      formData
    );
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

// const
