import { Router } from "express";
import {
  login,
  register,
  profileView,
  refreshToken,
  profileUpdate,
  requestVerificationCode,
  verifyAccount,
  changePassword,
  userProfile,
} from "./domain";
import {
  authenticate,
  uploader,
  requireAccountVerified,
} from "../../middlewares";
import { PROFILE_URL } from "../../utils";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate as any, profileView as any);
router.get("/user/:id", authenticate as any, userProfile);
router.post(
  "/profile",
  [
    authenticate as any,
    requireAccountVerified,
    uploader.memoryFile().single("image"),
  ],
  profileUpdate as any
);
router.get("/verify", authenticate as any, requestVerificationCode as any);
router.post("/verify", authenticate as any, verifyAccount as any);
router.post("/change-password", authenticate as any, changePassword as any);
router.get("/refresh-token", refreshToken as any);

export default router;
