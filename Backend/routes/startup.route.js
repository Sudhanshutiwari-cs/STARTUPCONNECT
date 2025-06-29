import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import {
  getAllStartups,
  getStartupById,
  registerStartup,
  updateStartup,
  getPublicStartups
} from "../controllers/startup.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

// Public routes
router.route("/public").get(getPublicStartups);
router.route("/public/:id").get(getStartupById);

// Protected routes
router.route("/register").post(authenticateToken, registerStartup);
router.route("/get").get(authenticateToken, getAllStartups);
router.route("/get/:id").get(authenticateToken, getStartupById);
router.route("/update/:id").put(authenticateToken, singleUpload, updateStartup);

export default router;