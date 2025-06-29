import express from "express";
import { chatbotResponse, getChatHistory } from "../controllers/chatbot.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";

const router = express.Router();

// Chatbot response endpoint - can work with or without authentication
router.route("/chat").post((req, res, next) => {
  // Try to authenticate, but don't fail if no token
  const token = req.cookies.token;
  if (token) {
    authenticateToken(req, res, next);
  } else {
    req.id = null; // No user ID if not authenticated
    next();
  }
}, chatbotResponse);

// Chat history endpoint - requires authentication
router.route("/history").get(authenticateToken, getChatHistory);

export default router;