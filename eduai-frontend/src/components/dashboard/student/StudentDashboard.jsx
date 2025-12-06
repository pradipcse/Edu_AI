import React, { useEffect, useState } from "react";
import API from "../../../api/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [error, setError] = useState("");

  // -------------------------------
  // Fetch Student Dashboard
  // -------------------------------
  const loadDashboard = async () => {
    try {
      const res = await API.get("/dashboard/student");
      setDashboard(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load student dashboard");
    }
  };

  // -------------------------------
  // Fetch All Courses
  // -------------------------------
  const loadCourses = async () => {
    try {
      const res = await API.get("/public/courses"); 
      setAllCourses(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load courses");
    }
  };

  // -------------------------------
  // Enroll in Course
  // -------------------------------
  const handleEnroll = async (courseId) => {
    try {
      await API.post(`/courses/${courseId}/enroll`);
      alert("Enrolled successfully!");

      await loadDashboard();
      await loadCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to enroll");
    }
  };

  // -------------------------------
  // Initial Load
  // -------------------------------
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await loadDashboard();
      await loadCourses();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p className="p-6 text-lg">Loading Dashboard...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const { enrolledCourses = [], courseWiseTaken = [] } = dashboard || {};

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>

      {/* -----------------------------------------------------------
         🔵 AVAILABLE COURSES (NOT ENROLLED)
      ------------------------------------------------------------ */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Available Courses</h2>
        {allCourses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allCourses.map((course) => {
              const alreadyEnrolled = enrolledCourses.some(
                (c) => c.id.toString() === course._id.toString()
              );
              return (
                <div
                  key={course._id}
                  className="border p-4 rounded-xl shadow bg-white"
                >
                  <h3 className="text-xl font-bold">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                  <p className="text-sm mt-1 text-gray-500">
                    Teacher: {course.teacher?.name || "Unknown"}
                  </p>

                  {!alreadyEnrolled ? (
                    <button
                      onClick={() => handleEnroll(course._id)}
                      className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Enroll Now
                    </button>
                  ) : (
                    <p className="mt-3 text-green-600 font-semibold">
                      ✔ Already Enrolled
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* -----------------------------------------------------------
         🟢 ENROLLED COURSES
      ------------------------------------------------------------ */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Your Enrolled Courses</h2>
        {enrolledCourses.length === 0 ? (
          <p>You are not enrolled in any course yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="border p-4 rounded-xl shadow bg-white"
              >
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="text-gray-600">{course.description}</p>
                <p className="text-sm mt-1 text-gray-500">
                  Teacher: {course.teacher?.name || "Unknown"}
                </p>

                <button
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Go to Course →
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* -----------------------------------------------------------
         🟡 QUIZZES TAKEN
      ------------------------------------------------------------ */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Quizzes Taken</h2>
        {courseWiseTaken.every((c) => c.quizzesTaken.length === 0) ? (
          <p>No quizzes taken yet.</p>
        ) : (
          <div className="space-y-4">
            {courseWiseTaken.map((cw) =>
              cw.quizzesTaken.map((quiz) => (
                <div
                  key={quiz.quizId}
                  className="border p-4 rounded-xl shadow bg-white"
                >
                  <h3 className="text-lg font-semibold">{quiz.quizTitle}</h3>
                  <p>Score: {quiz.score}</p>
                  <p className="text-gray-500">
                    Date: {new Date(quiz.completedAt).toLocaleDateString()}
                  </p>

                  <button
                    onClick={() => navigate(`/quiz/result/${quiz.quizId}`)}
                    className="mt-3 text-blue-600 hover:underline"
                  >
                    View Result →
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      {/* -----------------------------------------------------------
         🟣 PRACTICE QUIZZES (NEW SECTION)
      ------------------------------------------------------------ */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Practice Quizzes</h2>
        <p className="text-gray-600 mb-2">
          Improve your skills by taking topic-wise practice quizzes.
        </p>

        <button
          onClick={() => navigate("/student/practice-quizzes")}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          View Practice Quizzes →
        </button>
      </section>
    </div>
  );
}
