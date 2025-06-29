import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import {
  getAllOpportunities,
  getOpportunityById,
  postOpportunity,
  getFounderOpportunities,
  updateOpportunityStatus
} from "../controllers/opportunity.controller.js";

const router = express.Router();

// Public routes
router.route("/get").get(getAllOpportunities);
router.route("/get/:id").get(getOpportunityById);

// Protected routes
router.route("/post").post(authenticateToken, postOpportunity);
router.route("/founder").get(authenticateToken, getFounderOpportunities);
router.route("/status/:id").put(authenticateToken, updateOpportunityStatus);

export default router;