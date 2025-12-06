import { useEffect, useState } from "react";
import API from "../../../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function TeacherCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses"); 
      setCourses(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch courses");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    
    try {
      await API.delete(`/courses/${courseId}`);
      setCourses(courses.filter((c) => c._id !== courseId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Courses</h1>

      {courses.length === 0 ? (
        <p>You have not created any courses yet.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course._id} className="p-4 bg-white rounded shadow space-y-2">
              <p className="font-semibold text-lg">{course.title}</p>
              <p className="text-gray-600">{course.description}</p>

              {/* View Enrolled Students */}
              <Link
                to={`/teacher/courses/${course._id}/students`}
                className="text-blue-500 hover:underline block"
              >
                View Students
              </Link>

              {/* Create Quiz Button */}
              <button
                onClick={() => navigate(`/teacher/courses/${course._id}/quizzes/create`)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Create Quiz
              </button>

              {/* View Quizzes Button */}
              <button
                onClick={() => navigate(`/teacher/courses/${course._id}/quizzes`)}
                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 ml-2"
              >
                View Quizzes
              </button>

              {/* Delete Course */}
              <button
                onClick={() => deleteCourse(course._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 ml-2"
              >
                Delete Course
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
