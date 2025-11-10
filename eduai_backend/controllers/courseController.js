import Course from "../models/Course.js";

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

// Get all courses (accessible to all logged-in users)
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("teacher", "name email")
      .populate("students", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Student enrolls in a course
export const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Check if student already enrolled
    if (course.students.includes(req.user._id)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    course.students.push(req.user._id);
    await course.save();

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
