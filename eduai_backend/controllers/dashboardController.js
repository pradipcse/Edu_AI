// controllers/dashboardController.js
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import StudentPracticeQuiz from "../models/StudentPracticeQuiz.js";
import TeacherQuiz from "../models/TeacherQuiz.js";
import User from "../models/User.js";

/**
 * Student dashboard:
 * - profile
 * - enrolled courses (with teacher info)
 * - practice quizzes created by student
 * - quizzes taken course-wise (with quiz metadata)
 */
export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user._id;

    // 1) Basic profile
    const profile = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    };

    // 2) Enrolled courses (from Course.students and Enrollment)
    // Use Enrollment to find course-specific quiz-taking info
    const enrollments = await Enrollment.find({ student: studentId })
      .populate({
        path: "course",
        select: "title description teacher students createdAt updatedAt",
        populate: { path: "teacher", select: "name email" }
      })
      .lean();

    // Extract course list for frontend (unique)
    const enrolledCourses = enrollments.map((e) => {
      const c = e.course || null;
      if (!c) return null;
      return {
        id: c._id,
        title: c.title,
        description: c.description,
        teacher: c.teacher ? { id: c.teacher._id, name: c.teacher.name, email: c.teacher.email } : null,
        studentsCount: Array.isArray(c.students) ? c.students.length : undefined,
        enrolledAt: e.createdAt
      };
    }).filter(Boolean);

    // 3) Practice quizzes created by the student
    const practiceQuizzes = await StudentPracticeQuiz.find({ createdBy: studentId })
      .select("title topic questions createdAt expiresAt")
      .sort({ createdAt: -1 })
      .lean();

    // 4) Quizzes taken course-wise (use enrollments' quizzesTaken array)
    // We need metadata for the quiz ids (TeacherQuiz). Gather all quiz ids from enrollments.
    const quizIds = [];
    enrollments.forEach((e) => {
      if (Array.isArray(e.quizzesTaken)) {
        e.quizzesTaken.forEach((qt) => {
          if (qt && qt.quiz) quizIds.push(qt.quiz.toString());
        });
      }
    });

    // Fetch TeacherQuiz docs for the taken quizzes (if any)
    const takenQuizzesDocs = quizIds.length
      ? await TeacherQuiz.find({ _id: { $in: quizIds } }).select("title course createdBy").lean()
      : [];

    // Map quiz id -> doc for quick lookup
    const quizMap = new Map();
    takenQuizzesDocs.forEach((q) => quizMap.set(q._id.toString(), q));

    // Build course-wise detail: for each enrolled course, list quizzes taken with scores
    const courseWiseTaken = enrollments.map((e) => {
      const c = e.course;
      const taken = (e.quizzesTaken || []).map((qt) => {
        const qdoc = qt.quiz ? quizMap.get(qt.quiz.toString()) : null;
        return {
          quizId: qt.quiz,
          quizTitle: qdoc ? qdoc.title : null,
          score: qt.score,
          completedAt: qt.completedAt
        };
      });
      return {
        course: c ? { id: c._id, title: c.title } : null,
        quizzesTaken: taken
      };
    });

    // Final response
    return res.json({
      message: "Student dashboard",
      profile,
      enrolledCourses,
      practiceQuizzes,
      courseWiseTaken
    });
  } catch (err) {
    console.error("getStudentDashboard error:", err);
    return res.status(500).json({ message: "Failed to load student dashboard" });
  }
};

/**
 * Teacher dashboard:
 * - profile
 * - courses created by teacher (with students list)
 * - quizzes created by teacher (grouped per course)
 * - for each course: students enrolled + their quizzesTaken (with score)
 */
export const getTeacherDashboard = async (req, res) => {
  try {
    const teacherId = req.user._id;

    // 1) profile
    const profile = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    };

    // 2) Courses created by teacher and their students
    const courses = await Course.find({ teacher: teacherId })
      .populate("students", "name email")
      .lean();

    const courseIds = courses.map((c) => c._id);

    // 3) Quizzes created by teacher (TeacherQuiz) for these courses
    const teacherQuizzes = await TeacherQuiz.find({ course: { $in: courseIds } })
      .select("title course createdBy createdAt")
      .lean();

    // Group quizzes by courseId
    const quizzesByCourse = new Map();
    teacherQuizzes.forEach((q) => {
      const cid = q.course.toString();
      if (!quizzesByCourse.has(cid)) quizzesByCourse.set(cid, []);
      quizzesByCourse.get(cid).push({ id: q._id, title: q.title, createdAt: q.createdAt });
    });

    // 4) Enrollments for these courses to get students' quizzesTaken data
    const enrollments = await Enrollment.find({ course: { $in: courseIds } })
      .populate("student", "name email")
      .lean();

    // Group enrollments by course
    const enrollmentsByCourse = new Map();
    enrollments.forEach((en) => {
      const cid = en.course.toString();
      if (!enrollmentsByCourse.has(cid)) enrollmentsByCourse.set(cid, []);
      enrollmentsByCourse.get(cid).push(en);
    });

    // Build per-course details
    const coursesDetailed = courses.map((c) => {
      const cid = c._id.toString();
      const students = (c.students || []).map((s) => ({ id: s._id, name: s.name, email: s.email }));
      const quizzes = quizzesByCourse.get(cid) || [];
      const enrolls = enrollmentsByCourse.get(cid) || [];

      // For this course, build students with their quizzesTaken (if any)
      const studentsWithTaken = enrolls.map((en) => ({
        student: en.student ? { id: en.student._id, name: en.student.name, email: en.student.email } : null,
        quizzesTaken: (en.quizzesTaken || []).map((qt) => ({
          quizId: qt.quiz,
          score: qt.score,
          completedAt: qt.completedAt
        }))
      }));

      return {
        course: { id: c._id, title: c.title, description: c.description },
        students,
        quizzes,
        studentsWithTaken
      };
    });

    // 5) Optional summary counts
    const totalCourses = courses.length;
    const totalQuizzes = teacherQuizzes.length;
    const totalStudents = courses.reduce((acc, c) => acc + ((c.students && c.students.length) || 0), 0);

    return res.json({
      message: "Teacher dashboard",
      profile,
      stats: { totalCourses, totalQuizzes, totalStudents },
      courses: coursesDetailed
    });
  } catch (err) {
    console.error("getTeacherDashboard error:", err);
    return res.status(500).json({ message: "Failed to load teacher dashboard" });
  }
};
