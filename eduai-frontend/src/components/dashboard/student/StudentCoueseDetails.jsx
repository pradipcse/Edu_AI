import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../api/api"; // your axios instance

export default function StudentCourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourse = async () => {
    try {
      const res = await API.get(`/courses/${courseId}`);
      setCourse(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  if (loading) return <p className="p-6 text-lg">Loading course...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-gray-600">{course.description}</p>
      <p className="text-sm text-gray-500">Teacher: {course.teacher?.name}</p>

      <h2 className="text-2xl font-semibold mt-6">Quizzes</h2>
      {course.quizzes.length === 0 ? (
        <p>No quizzes available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {course.quizzes.map((quiz) => {
            // Find if student already took the quiz
            const enrollment = course.students.find(
              (s) => s._id === localStorage.getItem("userId") // assuming you save student ID in localStorage
            );
            let takenScore = null;
            if (enrollment && enrollment.quizzesTaken) {
              const taken = enrollment.quizzesTaken.find(
                (qt) => qt.quiz.toString() === quiz._id.toString()
              );
              if (taken) takenScore = taken.score;
            }

            return (
              <div
                key={quiz._id}
                className="p-4 bg-white rounded shadow flex flex-col justify-between"
              >
                <h3 className="text-xl font-semibold">{quiz.title}</h3>

                {takenScore !== null ? (
                  <p className="mt-2 text-green-600 font-medium">
                    Already taken: {takenScore} points
                  </p>
                ) : (
                  <button
                    onClick={() => navigate(`/student/quiz/${quiz._id}`)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Take Quiz
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
