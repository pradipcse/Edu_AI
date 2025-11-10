import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  createStudentPracticeQuiz,
  getMyPracticeQuizzes,
  deletePracticeQuiz
} from "../controllers/studentQuizController.js";

const router = express.Router();

// All routes are student-only
router.use(protect, authorize("student"));

// Create a practice quiz
router.post("/", createStudentPracticeQuiz);

// Get all practice quizzes of logged-in student
router.get("/", getMyPracticeQuizzes);

// Delete a practice quiz
router.delete("/:id", deletePracticeQuiz);

export default router;
