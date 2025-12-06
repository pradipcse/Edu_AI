import mongoose from "mongoose";

const quizAnswerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  questionText: { type: String, required: true },
  selectedAnswer: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const quizResultSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "TeacherQuiz", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    answers: [quizAnswerSchema]
  },
  { timestamps: true }
);

const StudentQuizResult = mongoose.model("StudentQuizResult", quizResultSchema);
export default StudentQuizResult;
