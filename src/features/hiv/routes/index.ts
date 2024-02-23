import { Router } from "express";
import { default as appointmentRouter } from "./appointments";
import { default as treatmentSupportRouter } from "./treatentSupport";
import { default as ordersRouter } from "./orders";
const router = Router();
router.use("/appointments", appointmentRouter);
router.use("/orders", ordersRouter);
router.use("/art-treatment-support", treatmentSupportRouter);
export default router;
