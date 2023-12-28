import { NextFunction, Request, Response, Router } from "express";
import ServiceClient from "../../../shared/ServiceClient";

const router = Router();

router.get("*", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileStream = await ServiceClient.callService("nishauri-users-ms", {
      method: "GET",
      url: req.path.substring(1),
      responseType: "stream",
    });
    // Pipe readable fileStream into res writable stream
    fileStream.pipe(res);
    return res;
  } catch (error) {
    return res.status(404).send("Not found");
  }
});

export default router;
