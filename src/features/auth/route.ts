import { Router } from "express";
import {
  login,
  register,
  profileView,
  refreshToken,
  profileUpdate,
} from "./domain";
import {
  authenticate,
  fileUploader,
  refreshToken as refresh,
  requireAccountSetupComplete,
} from "../../middlewares";
import { PROFILE_URL } from "../../utils";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate as any, profileView as any);
router.post(
  "/profile",
  [authenticate as any, fileUploader({ dest: PROFILE_URL }).single("image")],
  profileUpdate as any
);
router.get("/refresh-token", refresh as any, refreshToken as any);

export default router;
