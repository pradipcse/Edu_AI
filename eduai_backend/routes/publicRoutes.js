import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// Anyone can see all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("teacher", "name email")
      .select("title description teacher");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to load courses" });
  }
});

export default router;
