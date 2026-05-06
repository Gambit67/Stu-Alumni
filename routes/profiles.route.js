import express from "express";
import {
  getUserProfiles,
  getUserProfile,
  getSingleProfile,
  deleteUserProfile,
  updateProfileData,
} from "../controllers/profile.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// GET all users
router.get("/", getUserProfiles);

// Search for User by name (query param)
router.get("/search", getUserProfile);

// DELETE a user by id
router.delete("/", deleteUserProfile);

// Update (PUT) profile via dynamic route
router.put("/update", authenticateToken, updateProfileData);

// GET user by id
router.get("/:uid", getSingleProfile);

export default router;
