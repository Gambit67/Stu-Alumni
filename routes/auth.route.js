import express from "express";
import { authSignup, authLogin, tokenRefresh, authLogout } from "../controllers/auth.controller.js";

const router = express.Router();

// POST signUp new user
router.post("/signup", authSignup);

// POST login
router.post("/login", authLogin);

// POST refresh token
router.post("/token", tokenRefresh);

// POST logout
router.post("/logout", authLogout);

export default router;
