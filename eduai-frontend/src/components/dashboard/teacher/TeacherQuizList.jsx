import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../api/api";

export default function TeacherQuizList() {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [expandedQuizId, setExpandedQuizId] = useState(null);

  const fetchQuizzes = async () => {
    try {
      const res = await API.get(`/quiz?courseId=${courseId}`);
      setQuizzes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteQuiz = async (quizId) => {
    if (!window.confirm("Delete this quiz?")) return;

    try {
      await API.delete(`/quiz/${quizId}`);
      setQuizzes(quizzes.filter((q) => q._id !== quizId));
    } catch (err) {
      alert("Failed to delete quiz");
    }
  };

  const toggleQuiz = (quizId) => {
    setExpandedQuizId(expandedQuizId === quizId ? null : quizId);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Quizzes for Course</h1>

      {quizzes.length === 0 ? (
        <p className="text-center text-gray-600">No quizzes created yet.</p>
      ) : (
        quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="bg-white shadow-md rounded-lg mb-4 overflow-hidden"
          >
            {/* Title + Toggle */}
            <div
              onClick={() => toggleQuiz(quiz._id)}
              className="cursor-pointer px-4 py-3 flex justify-between items-center bg-blue-50 hover:bg-blue-100 transition"
            >
              <span className="font-semibold text-lg text-blue-700">{quiz.title}</span>
              <span className="text-blue-500">
                {expandedQuizId === quiz._id ? "▲" : "▼"}
              </span>
            </div>

            {/* Collapsible Content */}
            {expandedQuizId === quiz._id && (
              <div className="px-4 py-3 space-y-4 bg-gray-50">
                {quiz.description && (
                  <p className="text-gray-700">{quiz.description}</p>
                )}

                {quiz.questions?.length > 0 ? (
                  quiz.questions.map((q, index) => (
                    <div
                      key={q._id || index}
                      className="p-3 border rounded-lg bg-white shadow-sm"
                    >
                      <p className="font-medium mb-2">
                        Q{index + 1}: {q.questionText}
                      </p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        {q.options.map((opt, i) => (
                          <li
                            key={i}
                            className={
                              opt === q.correctAnswer
                                ? "font-semibold text-green-600"
                                : ""
                            }
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                      {/* Correct Answer Badge */}
                      <p className="mt-2 text-sm text-green-800 font-semibold">
                        Correct Answer: {q.correctAnswer || "N/A"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No questions in this quiz yet.</p>
                )}
              </div>
            )}

            {/* Delete Button */}
            <div className="px-4 py-3 bg-gray-50 flex justify-end">
              <button
                onClick={() => deleteQuiz(quiz._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Delete Quiz
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
