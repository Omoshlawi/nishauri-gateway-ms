import { Router } from "express";
import {
  addPrograms,
  deletePrograms,
  getPrograms,
  getRegisteredPrograms,
  register,
  updatePrograms,
  verifyProgramRegistration,
  requestVerification,
} from "../controllers";
import { authenticate } from "../../../middlewares";

const router = Router();

router.get(
  "/programs/patient-programs/",
  authenticate as any,
  getRegisteredPrograms
);
router.post("/programs/register", authenticate as any, register);
router.get("/programs/verify", authenticate as any, requestVerification);
router.post("/programs/verify", authenticate as any, verifyProgramRegistration);

router.get("/programs", getPrograms);
router.post("/programs", addPrograms);
router.put("/programs/:id", updatePrograms);
router.delete("/programs/:id", deletePrograms);

export default router;
