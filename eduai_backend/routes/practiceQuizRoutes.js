import express from "express";
import { createPracticeQuiz, getPracticeQuizzes } from "../controllers/practiceQuizController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Students can create AI practice quizzes
router.post("/", protect, authorize("student"), createPracticeQuiz);

// Students can get their practice quizzes
router.get("/", protect, authorize("student"), getPracticeQuizzes);

export default router;
