import { useEffect, useState } from "react";
import API from "../../../api/api";
import { useParams, useNavigate } from "react-router-dom";

export default function TakeQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resultModal, setResultModal] = useState(null);

  const fetchQuiz = async () => {
    try {
      const res = await API.get(`/quiz/${quizId}`);

      const cleanedQuiz = {
        ...res.data,
        questions: res.data.questions.map((q) => ({
          ...q,
          _id: String(q._id)
        }))
      };

      setQuiz(cleanedQuiz);
    } catch (err) {
      console.error("Quiz Load Error:", err);
      alert("Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (questionId, optionIndex) => {
    // Convert index to letter (0 => A, 1 => B, etc.)
    const letter = String.fromCharCode(65 + optionIndex);
    setAnswers((prev) => ({
      ...prev,
      [questionId]: letter,
    }));
  };

  const submitQuiz = async () => {
    if (Object.keys(answers).length !== quiz.questions.length) {
      return alert("Please answer all questions before submitting!");
    }

    setSubmitting(true);

    const formatted = Object.entries(answers).map(([qId, ansLetter]) => ({
      questionId: qId,
      selectedAnswer: ansLetter, // send letter (A/B/C/D)
    }));

    try {
      const res = await API.post(`/quiz/${quizId}/submit`, { answers: formatted });
      setResultModal({
        score: res.data.score,
        total: res.data.total,
        answers: res.data.answers,
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  if (loading) return <p className="p-4">Loading quiz...</p>;
  if (!quiz) return <p className="p-4 text-red-500">Quiz not found.</p>;

  return (
    <div className="p-4 md:w-2/3 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">{quiz.title}</h1>

      {quiz.questions.map((q, index) => (
        <div key={q._id} className="p-4 bg-white rounded-lg shadow mb-4 border">
          <p className="font-semibold mb-2">{index + 1}. {q.questionText}</p>

          {q.options.map((opt, idx) => (
            <label
              key={opt}
              className={`block p-2 rounded cursor-pointer border ${
                answers[q._id] === String.fromCharCode(65 + idx)
                  ? "bg-green-100 border-green-500"
                  : "bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name={q._id}
                value={String.fromCharCode(65 + idx)}
                checked={answers[q._id] === String.fromCharCode(65 + idx)}
                onChange={() => handleSelect(q._id, idx)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={submitQuiz}
        disabled={submitting}
        className={`px-6 py-2 mt-4 w-full text-white rounded-lg ${
          submitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {submitting ? "Submitting..." : "Submit Quiz"}
      </button>

      {resultModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Quiz Completed!</h2>

            <p className="mb-4">
              You scored: <span className="font-semibold">{resultModal.score}</span> / {resultModal.total}
            </p>

            <div className="text-left max-h-60 overflow-y-auto mb-4">
              {resultModal.answers.map((ans, idx) => (
                <div key={ans.questionId} className="mb-2">
                  <p className="font-semibold">{idx + 1}. {ans.questionText}</p>

                  <p>
                    Your Answer:{" "}
                    <span className={ans.isCorrect ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                      {ans.selectedAnswer || "Not answered"}
                    </span>
                  </p>

                  {!ans.isCorrect && (
                    <p>
                      Correct Answer: <span className="text-green-600 font-bold">{ans.correctAnswer}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => navigate("/student/dashboard")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
