import { Router } from "express";
import { getFacilities, createFacility } from "../controllers/facilities";
import { uploader } from "../../../middlewares";

const router = Router();

router.get("/", getFacilities);
router.post("/", uploader.memoryFile().array("images"), createFacility);

export default router;
