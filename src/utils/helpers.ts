import { Response } from "express";
import { UserRequest } from "../shared/types";
import fs from "fs";

export const formartError = (errors: any) => {
  return {
    status: 0,
    errors: {},
  };
};

const deleteUploadedFile = async (filePath: string) => {
  /**
   * Delete newly uploaded file when file has not changed preventing file dublication
   */

  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        console.log("Error deleting file:", error);
        reject(false);
      } else {
        console.log("File deleted successfully:", filePath);
        resolve(true);
      }
    });
  });
};

export const getUpdateFileAsync = async (
  req: UserRequest,
  dst: string,
  currImage: string | undefined
) => {
  if (req.file) {
    const originalImage = `/${dst}/${req.file.originalname}`;
    // if file is not updated then return original else return new
    if (originalImage === currImage) {
      // Delete new upload and return the old
      await deleteUploadedFile(req.file.path);
      return originalImage;
    }
    // In future you can delete old
    return `/${dst}/${req.file.filename}`;
  }
};
