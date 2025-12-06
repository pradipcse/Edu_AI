import { useEffect, useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const enrollCourse = async (courseId) => {
    try {
      await API.post(`/courses/${courseId}/enroll`);
      alert("Enrolled successfully!");
      navigate("/student/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to enroll");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Available Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course._id} className="p-4 bg-white shadow rounded">
            <h2 className="font-bold text-lg">{course.title}</h2>
            <p>{course.description}</p>

            <button
              onClick={() => enrollCourse(course._id)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Enroll
            </button>

            <button
              onClick={() => navigate(`/student/course/${course._id}/quizzes`)}
              className="mt-3 ml-2 px-4 py-2 bg-green-600 text-white rounded"
            >
              View Quizzes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
