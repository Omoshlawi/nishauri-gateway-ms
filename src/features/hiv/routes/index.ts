import { Router } from "express";
import { default as appointmentRouter } from "./appointments";
import { default as treatmentSupportRouter } from "./treatentSupport";
const router = Router();
router.use("/appointments", appointmentRouter);
router.use("/art-treatment-support", treatmentSupportRouter);
export default router;
