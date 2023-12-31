import { Router } from "express";
import {
  addPrograms,
  deletePrograms,
  getPrograms,
  getRegisteredPrograms,
  register,
  updatePrograms,
} from "../controllers";
import { authenticate } from "../../../middlewares";

const router = Router();

router.get("/programs/patient-programs/:id", getRegisteredPrograms);
router.post("/programs/register-patient", authenticate as any, register);

router.get("/programs", getPrograms);
router.post("/programs", addPrograms);
router.put("/programs/:id", updatePrograms);
router.delete("/programs/:id", deletePrograms);

export default router;
