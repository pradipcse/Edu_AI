import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  createCourse,
  getAllCourses,
  getCourseById,      // <-- import the new controller
  enrollInCourse,
  getStudentsInCourse
} from "../controllers/courseController.js";

const router = express.Router();

// Teacher creates a course
router.post("/", protect, authorize("teacher"), createCourse);

// Get all courses (for dashboard)
router.get("/", protect, getAllCourses);

// Get single course by ID (for StudentCourseDetails)
router.get("/:courseId", protect, getCourseById); // <-- add this

// Student enrolls in course
router.post("/:courseId/enroll", protect, authorize("student"), enrollInCourse);

// Teacher views students in a course
router.get("/:courseId/students", protect, authorize("teacher"), getStudentsInCourse);

export default router;
