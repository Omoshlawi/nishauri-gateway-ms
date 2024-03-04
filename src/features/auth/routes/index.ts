import { Router } from "express";

import { default as oauthSignInRoutes } from "./signin";
import { default as oauthCallbackRoutes } from "./callback";
import { authProviders, refreshToken, registerUser } from "../controlers";

const router = Router();
router.use("/signin", oauthSignInRoutes);
router.use("/callback", oauthCallbackRoutes);
router.post("/signup", registerUser);
router.get("/providers", authProviders);
router.get("/refresh-token", refreshToken);
export default router;
