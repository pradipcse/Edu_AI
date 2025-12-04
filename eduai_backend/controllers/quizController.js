import TeacherQuiz from "../models/TeacherQuiz.js";
import StudentQuizResult from "../models/StudentQuizResult.js";
import Course from "../models/Course.js";
import { generateQuizFromAI } from "../utils/aiQuiz.js";

// =============================
// Teacher: Create AI Quiz
// =============================
export const createAIQuiz = async (req, res) => {
  try {
    const { title, description, topic, courseId, numQuestions } = req.body;

    if (!title || !courseId || !topic)
      return res.status(400).json({ message: "Title, courseId, and topic are required" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Ensure only the course teacher can create quiz
    if (course.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to create quiz in this course" });
    }

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

// =============================
// Teacher: Get Quizzes Created By Logged-in Teacher
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
// Student: View Quizzes for a Course They Are Enrolled In
// =============================
export const getQuizzesForStudent = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({
      _id: courseId,
      students: req.user._id
    });

    if (!course) {
      return res.status(403).json({ message: "Not enrolled in this course" });
    }

    const quizzes = await TeacherQuiz.find({ course: courseId })
      .select("title description createdAt");

    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================
// Student: Submit Quiz & Save Score
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

    let score = 0;
    const formattedAnswers = [];

    quiz.questions.forEach((q) => {
      const userAns = answers.find(a => a.questionId === q._id.toString());
      if (userAns) {
        const isCorrect = q.correctAnswer === userAns.selectedAnswer;
        if (isCorrect) score++;
        formattedAnswers.push({
          questionId: q._id,
          selectedAnswer: userAns.selectedAnswer,
          isCorrect
        });
      }
    });

    const result = await StudentQuizResult.create({
      quiz: quizId,
      student: req.user._id,
      score,
      total: quiz.questions.length,
      answers: formattedAnswers
    });

    res.json({ message: "Quiz submitted successfully", score, total: quiz.questions.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================
// Teacher: Delete Quiz They Created
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
    res.status(500).json({ message: err.message });
  }
};
