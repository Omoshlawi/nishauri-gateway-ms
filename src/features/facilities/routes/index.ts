import { Router } from "express";
import { uploader } from "../../../middlewares";
import {
  createFacility,
  createFacilityLevel,
  getFacilities,
  getFacilityLevels,
} from "../controllers";

const router = Router();

router.get("/levels", getFacilityLevels);
router.post("/levels", createFacilityLevel);

router.get("/", getFacilities);
router.post("/", uploader.memoryFile().array("images"), createFacility);

export default router;
