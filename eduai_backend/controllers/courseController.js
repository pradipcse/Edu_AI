import Course from "../models/Course.js";
import Enrollment from "../models/enrollment.js";
import TeacherQuiz from "../models/TeacherQuiz.js";

// Teacher creates a course
export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    const course = await Course.create({
      title,
      description,
      teacher: req.user._id
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all courses created by the logged-in teacher
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user._id })
      .populate("teacher", "name email")
      .populate("students", "name email")
      .lean();

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single course by ID including quizzes
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate("teacher", "name email")
      .lean();

    if (!course) return res.status(404).json({ message: "Course not found" });

    const quizzes = await TeacherQuiz.find({ course: course._id })
      .select("title")
      .lean();

    res.json({ ...course, quizzes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Student enrolls in a course
export const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const studentId = req.user._id;

    // 1️⃣ Check if already enrolled via Enrollment collection
    const existingEnrollment = await Enrollment.findOne({ student: studentId, course: course._id });
    if (existingEnrollment) return res.status(400).json({ message: "Already enrolled" });

    // 2️⃣ Create Enrollment
    await Enrollment.create({ student: studentId, course: course._id });

    // 3️⃣ Update Course.students array if not already included
    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();
    }

    res.json({ message: "Enrolled successfully", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Teacher views students in a course
export const getStudentsInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate("students", "name email");
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Only teacher can view students
    if (course.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(course.students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
