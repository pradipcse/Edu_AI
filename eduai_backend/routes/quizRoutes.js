import mongoose from "mongoose";

const studentQuizSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 3 // Delete after **3 days**
  }
});

const StudentQuiz = mongoose.model("StudentQuiz", studentQuizSchema);
export default StudentQuiz;
