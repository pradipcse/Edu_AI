// routes/dashboardRoutes.js
import express from "express";
import { getStudentDashboard, getTeacherDashboard } from "../controllers/dashboardController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Student dashboard (single API returns all student data)
router.get("/student", protect, authorize("student"), getStudentDashboard);

// Teacher dashboard (single API returns all teacher data)
router.get("/teacher", protect, authorize("teacher"), getTeacherDashboard);

export default router;
