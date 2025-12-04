import express from "express";
import {
  createAIQuiz,
  getAllTeacherQuizzes,
  getQuizzesForStudent,
  submitQuiz,
  deleteQuiz
} from "../controllers/quizController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Teacher Routes
router.post("/", protect, authorize("teacher"), createAIQuiz);
router.get("/", protect, authorize("teacher"), getAllTeacherQuizzes);
router.delete("/:quizId", protect, authorize("teacher"), deleteQuiz);

// Student Routes
router.get("/course/:courseId", protect, authorize("student"), getQuizzesForStudent);
router.post("/:quizId/submit", protect, authorize("student"), submitQuiz);

export default router;
