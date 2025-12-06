import express from "express";
import { 
  createStudentPracticeQuiz,
  getMyPracticeQuizzes,
  getSinglePracticeQuiz,
  deletePracticeQuiz
} from "../controllers/studentQuizController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("student"), createStudentPracticeQuiz);
router.get("/", protect, authorize("student"), getMyPracticeQuizzes);
router.get("/:id", protect, authorize("student"), getSinglePracticeQuiz);
router.delete("/:id", protect, authorize("student"), deletePracticeQuiz);

export default router;
