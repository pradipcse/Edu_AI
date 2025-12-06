import StudentPracticeQuiz from "../models/StudentPracticeQuiz.js";
import { generateQuizFromAI } from "../utils/aiQuiz.js";

// Create Practice Quiz
export const createStudentPracticeQuiz = async (req, res) => {
  try {
    const { topic, numQuestions } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    // CALLING YOUR UNCHANGED AI FUNCTION
    const questions = await generateQuizFromAI(topic, numQuestions || 5);

    const quiz = await StudentPracticeQuiz.create({
      createdBy: req.user._id,
      title: topic,
      topic,
      questions
    });

    res.status(201).json({
      message: "Practice quiz created",
      quiz
    });
  } catch (err) {
    console.error("Student Quiz Create Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all quizzes created by the student
export const getMyPracticeQuizzes = async (req, res) => {
  try {
    const quizzes = await StudentPracticeQuiz.find({
      createdBy: req.user._id
    }).sort({ createdAt: -1 });

    res.json(quizzes);
  } catch (err) {
    console.error("Get Quizzes Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get single quiz
export const getSinglePracticeQuiz = async (req, res) => {
  try {
    const quiz = await StudentPracticeQuiz.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.json(quiz);
  } catch (err) {
    console.error("Get Single Quiz Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete quiz
export const deletePracticeQuiz = async (req, res) => {
  try {
    const quiz = await StudentPracticeQuiz.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!quiz)
      return res.status(404).json({ message: "Not found or unauthorized" });

    res.json({ message: "Practice quiz deleted" });
  } catch (err) {
    console.error("Delete Quiz Error:", err);
    res.status(500).json({ message: err.message });
  }
};
