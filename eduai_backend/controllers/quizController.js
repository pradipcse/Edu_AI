import Quiz from "../models/Quiz.js";
import Course from "../models/Course.js";
import { generateQuizFromAI } from "../utils/aiQuiz.js";

// AI Quiz creation for Teacher or Student
export const createAIQuiz = async (req, res) => {
  try {
    const { title, description, courseId, topic, numQuestions } = req.body;

    // Determine if personal quiz (student) or course quiz (teacher)
    let course = null;
    let isPersonal = false;

    if (req.user.role === "teacher") {
      // Teacher must provide courseId
      if (!courseId) return res.status(400).json({ message: "courseId is required for teacher" });
      course = await Course.findById(courseId);
      if (!course) return res.status(404).json({ message: "Course not found" });
      if (course.teacher.toString() !== req.user._id.toString())
        return res.status(403).json({ message: "Not authorized" });
    } else if (req.user.role === "student") {
      // Student generates personal quiz
      isPersonal = true;
    } else {
      return res.status(403).json({ message: "Invalid role" });
    }

    // Call AI to generate questions
    const questions = await generateQuizFromAI(topic, numQuestions || 5);

    const quiz = await Quiz.create({
      title,
      description,
      course: course ? course._id : null,
      questions,
      createdBy: req.user._id,
      isPersonal
    });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
