import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../api/api";

export default function TeacherDashboard() {
  const [data, setData] = useState({
    courses: [],
    quizzes: [],
    students: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // for programmatic navigation

  const fetchData = async () => {
    try {
      const res = await API.get("/dashboard/teacher");
      setData(res.data || { courses: [], quizzes: [], students: [] }); // safe fallback
    } catch (err) {
      console.error(err);
      setError("Failed to load teacher dashboard");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <Link
          to="/teacher/create-course"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ➕ Create Course
        </Link>
        <Link
          to="/teacher/create-quiz"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          📝 Create Quiz
        </Link>
        <Link
          to="/teacher/students"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          👨‍🎓 View Students
        </Link>
        <button
          onClick={() => navigate("/teacher/courses")}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          📚 View Your Courses
        </button>
      </div>

    </div>
  );
}
