import Enrollment from "../models/enrollment.js";

export const getEnrollmentByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId
    }).populate("quizzesTaken.quiz", "title");

    if (!enrollment) return res.json({ quizzesTaken: [] });

    res.json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
