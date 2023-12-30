import { Router } from "express";
import {
  addPrograms,
  deletePrograms,
  getPrograms,
  updatePrograms,
} from "../controllers";

const router = Router();

router.get("/programs", getPrograms);
router.post("/programs", addPrograms);
router.put("/programs/:id", updatePrograms);
router.delete("/programs/:id", deletePrograms);

export default router;
