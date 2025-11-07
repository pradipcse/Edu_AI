import TeacherQuiz from "../models/TeacherQuiz.js";
import { generateQuizFromAI } from "../utils/aiQuiz.js";

// Create AI Quiz (Teacher)
export const createAIQuiz = async (req, res) => {
  try {
    const { title, description, topic, courseId, numQuestions } = req.body;

    if (!title || !courseId || !topic)
      return res.status(400).json({ message: "Title, courseId, and topic are required" });

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
    console.error("Quiz Creation Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Get all quizzes created by the teacher
export const getAllTeacherQuizzes = async (req, res) => {
  try {
    const quizzes = await TeacherQuiz.find({ createdBy: req.user._id })
      .populate("course", "title")
      .sort({ createdAt: -1 });

    res.json(quizzes);
  } catch (err) {
    console.error("Error fetching quizzes:", err.message);
    res.status(500).json({ message: err.message });
  }
};
