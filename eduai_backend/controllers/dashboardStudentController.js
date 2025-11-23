import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import StudentPracticeQuiz from "../models/StudentPracticeQuiz.js";
import TeacherQuiz from "../models/TeacherQuiz.js";

export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user._id;

    // 1. Get enrolled courses
    const enrollments = await Enrollment.find({ student: studentId })
      .populate({
        path: "course",
        select: "title description teacher",
        populate: { path: "teacher", select: "name email" }
      });

    // 2. Get practice quizzes created by the student
    const practiceQuizzes = await StudentPracticeQuiz.find({ createdBy: studentId })
      .sort({ createdAt: -1 })
      .limit(10);

    // 3. Prepare course-wise quizzes taken
    const quizzesTaken = enrollments.map(enroll => ({
      course: enroll.course,
      quizzesTaken: enroll.quizzesTaken
    }));

    res.json({
      message: "Student dashboard data loaded",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
      enrolledCourses: enrollments.map(e => e.course),
      practiceQuizzes,
      quizzesTaken
    });

  } catch (error) {
    console.error("Student Dashboard Error:", error);
    res.status(500).json({ message: "Failed to load student dashboard" });
  }
};
