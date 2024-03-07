import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateProfile,
  viewProfile,
} from "../controlers";
import {
  authenticate as requireAuthenticated,
  uploader,
} from "../../../middlewares";

const router = Router();
router.get("/", getUsers);
router.get("/profile", requireAuthenticated, viewProfile);
router.post(
  "/profile",
  [requireAuthenticated, uploader.memoryFile().single("image")],
  updateProfile
);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
export default router;
