import mongoose from "mongoose";
import TeacherQuiz from "../models/TeacherQuiz.js";
import StudentQuizResult from "../models/StudentQuizResult.js";
import Course from "../models/Course.js";
import Enrollment from "../models/enrollment.js";
import { generateQuizFromAI } from "../utils/aiQuiz.js";

// =============================
// TEACHER: Create AI Quiz
// =============================
export const createAIQuiz = async (req, res) => {
  try {
    const { title, description, topic, courseId, numQuestions } = req.body;

    if (!title || !courseId || !topic)
      return res
        .status(400)
        .json({ message: "Title, courseId, and topic are required" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Ensure correct teacher
    if (course.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const questions = await generateQuizFromAI(topic, numQuestions || 5);

    const quiz = await TeacherQuiz.create({
      title,
      description,
      course: courseId,
      questions,
      createdBy: req.user._id,
    });

    res.status(201).json(quiz);
  } catch (err) {
    console.error("Quiz Creation Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// =============================
// TEACHER: Get All Quizzes
// =============================
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

// =============================
// STUDENT: Get Quizzes for Course
// =============================
export const getQuizzesForStudent = async (req, res) => {
  try {
    const { courseId } = req.params;

    const enrolled = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (!enrolled) {
      return res
        .status(403)
        .json({ message: "Not enrolled in this course" });
    }

    const quizzes = await TeacherQuiz.find({ course: courseId }).select(
      "title description createdAt"
    );

    res.json(quizzes);
  } catch (err) {
    console.error("Fetch Student Quizzes Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// =============================
// STUDENT: Get Single Quiz
// =============================
export const getSingleQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await TeacherQuiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
  } catch (err) {
    console.error("Fetch Quiz Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// =============================
// STUDENT: Submit Quiz (UPDATED)
// =============================
export const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Answers are required" });
    }

    const quiz = await TeacherQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Check enrollment
    const enrolled = await Enrollment.findOne({
      student: req.user._id,
      course: quiz.course,
    });

    if (!enrolled) {
      return res
        .status(403)
        .json({ message: "You are not enrolled in this course" });
    }

    const clean = (s) =>
      typeof s === "string" ? s.trim().toLowerCase() : "";

    let score = 0;

    const detailedAnswers = answers
      .map((ans) => {
        let qId;
        try {
          qId = new mongoose.Types.ObjectId(ans.questionId);
        } catch {
          return null;
        }

        const question = quiz.questions.id(qId);
        if (!question) return null;

        const isCorrect =
          clean(question.correctAnswer) === clean(ans.selectedAnswer);

        if (isCorrect) score += 1;

        return {
          questionId: ans.questionId,
          questionText: question.questionText,
          selectedAnswer: ans.selectedAnswer,
          correctAnswer: question.correctAnswer,
          isCorrect,
        };
      })
      .filter(Boolean);

    const total = quiz.questions.length;

    await StudentQuizResult.create({
      quiz: quizId,
      student: req.user._id,
      score,
      total,
      answers: detailedAnswers,
    });

    res.json({
      message: "Quiz submitted successfully",
      score,
      total,
      answers: detailedAnswers,
    });
  } catch (err) {
    console.error("Submit Quiz Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// =============================
// TEACHER: Delete Quiz
// =============================
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await TeacherQuiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    if (quiz.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await quiz.deleteOne();
    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    console.error("Delete Quiz Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
