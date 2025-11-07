import TeacherQuiz from "../models/TeacherQuiz.js";
import Course from "../models/Course.js";
import { generateQuizFromAI } from "../utils/aiQuiz.js";

// Create AI-generated quiz for teacher
export const createAIQuiz = async (req, res) => {
  try {
    const { title, description, topic, courseId, numQuestions } = req.body;

    // Validate course
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Only teacher of the course can create quiz
    if (course.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Generate questions from AI
    const questions = await generateQuizFromAI(topic, numQuestions || 5);

    const quiz = await TeacherQuiz.create({
      title,
      description,
      course: courseId,
      questions,
      createdBy: req.user._id
    });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get quizzes for a course
export const getQuizzesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const quizzes = await TeacherQuiz.find({ course: courseId });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
