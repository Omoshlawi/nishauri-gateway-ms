import { NextFunction, Request, Response, Router } from "express";
import ServiceClient from "../../../shared/ServiceClient";
import path from "path";
const router = Router();

function sanitizeAndParsePath(filePath: string) {
  // /uploads/nishauri-users-ms-1.0.0-1703775253101-expo.jpg
  const fileName = path.basename(filePath);
  const regex = /(\S+)-(\d+\.\d+\.\d+)-/;
  const match = fileName.match(regex);
  if (match) {
    const serviceName = match[1];
    const version = match[2];
    return {
      serviceName,
      version,
      filePath: filePath.startsWith("/") ? filePath.substring(1) : filePath,
    };
  }
  throw new Error("File not found");
}

router.get("*", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filePath, serviceName, version } = sanitizeAndParsePath(req.path);
    const fileStream = await ServiceClient.callService(serviceName, {
      method: "GET",
      url: filePath,
      responseType: "stream",
    });
    // Pipe readable fileStream into res writable stream
    fileStream.pipe(res);
    return res;
  } catch (error) {
    console.error(error);

    return res.status(404).send("Not found");
  }
});

export default router;
