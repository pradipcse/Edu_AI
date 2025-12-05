// routes/quizRoutes.js
import express from "express";
import {
  createAIQuiz,
  getAllTeacherQuizzes,
  getQuizzesForStudent,
  getSingleQuiz,
  submitQuiz,
  deleteQuiz
} from "../controllers/quizController.js";

import { getEnrollmentByCourse } from "../controllers/enrollmentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==============================
// TEACHER ROUTES
// ==============================

// Create quiz
router.post("/", protect, authorize("teacher"), createAIQuiz);

// Get all quizzes by logged-in teacher
router.get("/", protect, authorize("teacher"), getAllTeacherQuizzes);

// Delete quiz
router.delete("/:quizId", protect, authorize("teacher"), deleteQuiz);

// ==============================
// STUDENT ROUTES
// ==============================

// View quizzes for a course (only if enrolled)
router.get("/course/:courseId", protect, authorize("student"), getQuizzesForStudent);

// Get enrollment info
router.get("/enrollment/:courseId", protect, authorize("student"), getEnrollmentByCourse);

// GET single quiz → FOR TAKING THE QUIZ
router.get("/:quizId", protect, authorize("student"), getSingleQuiz);

// Submit quiz
router.post("/:quizId/submit", protect, authorize("student"), submitQuiz);

export default router;
