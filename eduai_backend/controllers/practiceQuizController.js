import StudentPracticeQuiz from "../models/StudentPracticeQuiz.js";
import { generateQuizFromAI } from "../utils/aiQuiz.js";

// Create AI practice quiz (student)
export const createPracticeQuiz = async (req, res) => {
  try {
    const { title, topic, numQuestions } = req.body;

    // Generate questions from AI
    const questions = await generateQuizFromAI(topic, numQuestions || 5);

    const quiz = await StudentPracticeQuiz.create({
      title,
      topic,
      questions,
      createdBy: req.user._id
      // expiresAt is automatically set to 3 days from creation
    });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all practice quizzes of logged-in student
export const getPracticeQuizzes = async (req, res) => {
  try {
    const quizzes = await StudentPracticeQuiz.find({ createdBy: req.user._id });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
