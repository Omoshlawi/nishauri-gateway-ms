import { Router } from "express";
import { default as appointmentRouter } from "./appointments";
const router = Router();
router.use("/appointments", appointmentRouter);
export default router;
