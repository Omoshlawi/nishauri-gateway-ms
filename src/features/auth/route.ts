import { Router } from "express";
import { register } from "./domain";

const router = Router();

router.post("/register", register);

export default router;
