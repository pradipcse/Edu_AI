import React, { useEffect, useState } from "react";
import API from "../../api/api"; // your axios instance
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EnrolledCoursesPage() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState("");

  // Fetch enrolled courses from student dashboard API
  const loadEnrolledCourses = async () => {
    try {
      const res = await API.get("/dashboard/student"); // Returns all student dashboard data
      setEnrolledCourses(res.data.enrolledCourses || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load enrolled courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnrolledCourses();
  }, []);

  if (loading) return <p className="p-6 text-lg">Loading enrolled courses...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Your Enrolled Courses</h1>

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
    </div>
  );
}
