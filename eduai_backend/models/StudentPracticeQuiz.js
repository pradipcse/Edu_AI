import mongoose from "mongoose";

const practiceQuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    topic: { type: String, required: true },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String }],
        correctAnswer: { type: String, required: true }
      }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) } // auto-expire after 3 days
  },
  { timestamps: true }
);

// Auto-delete after expiration
practiceQuizSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const StudentPracticeQuiz = mongoose.model("StudentPracticeQuiz", practiceQuizSchema);

export default StudentPracticeQuiz;
