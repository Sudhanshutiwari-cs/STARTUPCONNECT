import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// Public route - Get all jobs (no authentication required for browsing)
router.route("/get").get(getAllJobs);

// Public route - Get job by ID (no authentication required for viewing)
router.route("/get/:id").get(getJobById);

// Protected routes - Require authentication
router.route("/post").post(authenticateToken, postJob);
router.route("/getadminjobs").get(authenticateToken, getAdminJobs);

export default router;