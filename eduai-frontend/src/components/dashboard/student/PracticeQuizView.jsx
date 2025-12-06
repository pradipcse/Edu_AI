import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../api/api";

export default function PracticeQuizView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [deleting, setDeleting] = useState(false); // ✅ for delete loading

  const fetchQuiz = async () => {
    try {
      const res = await API.get(`/student/quizzes/${id}`);
      setQuiz(res.data);
      setTimeLeft(res.data.questions.length * 60);
    } catch (err) {
      console.error("Failed to load quiz", err);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (!started || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && started) {
      submitQuiz();
    }
  }, [timeLeft]);

  if (!quiz) return <p className="text-center mt-10">Loading...</p>;

  const handleSelect = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const submitQuiz = () => {
    let correct = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) correct++;
    });

    setScore(correct);
    setShowResult(true);
    setStarted(false);
  };

  // -----------------------------
  // Delete Quiz Function
  // -----------------------------
  const handleDeleteQuiz = async () => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      setDeleting(true);
      await API.delete(`/student/quizzes/${id}`);
      alert("Quiz deleted successfully!");
      navigate("/student/practice-quizzes"); // Go back to quiz list
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete quiz");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{quiz.title}</h1>
      <p className="text-gray-600 mb-4">Topic: {quiz.topic}</p>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => navigate("/student/practice-quizzes")}
          className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Back
        </button>

        <button
          onClick={handleDeleteQuiz}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete Quiz"}
        </button>
      </div>

      {started && (
        <div className="text-xl font-bold text-red-600 mb-4">
          Time Left: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      )}

      {!started && !showResult && (
        <button
          onClick={() => setStarted(true)}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Start Test
        </button>
      )}

      {started && (
        <div className="mt-6 space-y-6">
          {quiz.questions.map((q, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <p className="font-semibold mb-2">
                {index + 1}. {q.questionText}
              </p>

              <div className="space-y-2">
                {q.options.map((option, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`q-${index}`}
                      onChange={() => handleSelect(index, option)}
                      checked={answers[index] === option}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={submitQuiz}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-4"
          >
            Submit
          </button>
        </div>
      )}

      {showResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Your Score</h2>
            <p className="text-xl mb-4">
              Correct Answers: <span className="font-bold">{score}</span> / {quiz.questions.length}
            </p>

            <button
              onClick={() => navigate("/student/practice-quizzes")}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Practice Quizzes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
