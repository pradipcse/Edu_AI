import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { createAIQuiz, getAllTeacherQuizzes } from "../controllers/quizController.js";

const router = express.Router();

// Teacher-only routes
router.post("/ai", protect, authorize("teacher"), createAIQuiz);
router.get("/", protect, authorize("teacher"), getAllTeacherQuizzes);

export default router;
