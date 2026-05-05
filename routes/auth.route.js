import express from "express";
import { authSignup, authLogin } from "../controllers/auth.controller.js";

const router = express.Router();

// POST signUp new user
router.post("/signup", authSignup);

// POST login
router.post("/login", authLogin);

export default router;
