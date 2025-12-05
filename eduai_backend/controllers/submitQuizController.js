import TeacherQuiz from "../models/TeacherQuiz.js";
import StudentQuizResult from "../models/StudentQuizResult.js";
import Enrollment from "../models/Enrollment.js";

export const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;

    const quiz = await TeacherQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Validate student enrollment
    if (quiz.course) {
      const isEnrolled = await Enrollment.findOne({
        student: req.user._id,
        course: quiz.course
      });

      if (!isEnrolled) {
        return res.status(403).json({ message: "You are not enrolled in this course" });
      }
    }

    // Calculate score
    let score = 0;
    const detailedAnswers = answers.map((ans) => {
      const q = quiz.questions.id(ans.questionId);
      const isCorrect = q.correctAnswer === ans.selectedAnswer;

      if (isCorrect) score += 1;

      return {
        questionId: ans.questionId,
        selectedAnswer: ans.selectedAnswer,
        isCorrect
      };
    });

    const total = quiz.questions.length;

    // Save quiz result in StudentQuizResult
    const result = await StudentQuizResult.create({
      quiz: quizId,
      student: req.user._id,
      score,
      total,
      answers: detailedAnswers
    });

    // 🔥 ALSO Save inside Enrollment
    await Enrollment.findOneAndUpdate(
      { student: req.user._id, course: quiz.course },
      {
        $push: {
          quizzesTaken: {
            quiz: quizId,
            score,
            completedAt: new Date()
          }
        }
      },
      { upsert: true }
    );

    res.json({
      message: "Quiz submitted successfully",
      score,
      total,
      result
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
