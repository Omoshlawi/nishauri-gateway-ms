import { Router } from "express";
import { login, register, profileView, refreshToken } from "./domain";
import {
  authenticate,
  refreshToken as refresh,
  requireAccountSetupComplete,
} from "../../middlewares";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", [authenticate, profileView as any]);
router.get("/refresh-token", [refresh, refreshToken as any]);

export default router;
