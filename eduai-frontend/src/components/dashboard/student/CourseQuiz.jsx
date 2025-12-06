import { useEffect, useState } from "react";
import API from "../../api/api";
import { useParams, useNavigate } from "react-router-dom";

export default function CourseQuizzes() {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    try {
      const res = await API.get(`/quiz/course/${courseId}`);
      setQuizzes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Course Quizzes</h1>

      {quizzes.map((q) => (
        <div key={q._id} className="p-4 bg-white rounded shadow mb-2">
          <h2 className="font-semibold">{q.title}</h2>
          <button
            onClick={() => navigate(`/student/quiz/${q._id}`)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Take Quiz
          </button>
        </div>
      ))}
    </div>
  );
}
