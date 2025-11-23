import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
 import TeacherQuiz from "../models/TeacherQuiz.js";

export const getTeacherDashboard = async (req, res) => {
  try {
    const teacherId = req.user._id;

    // 1. Courses created by the teacher
    const courses = await Course.find({ teacher: teacherId })
      .populate("students", "name email");

    // 2. Quizzes created by the teacher
    const courseIds = courses.map(c => c._id);
    const quizzes = await Quiz.find({ course: { $in: courseIds } })
      .populate("course", "title")
      .sort({ createdAt: -1 });

    // 3. Students enrolled per course (already populated in courses)
    const courseDetails = courses.map(course => ({
      course,
      students: course.students,
      quizzes: quizzes.filter(q => q.course._id.toString() === course._id.toString())
    }));

    res.json({
      message: "Teacher dashboard data loaded",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
      courses: courseDetails
    });

  } catch (error) {
    console.error("Teacher Dashboard Error:", error);
    res.status(500).json({ message: "Failed to load teacher dashboard" });
  }
};
