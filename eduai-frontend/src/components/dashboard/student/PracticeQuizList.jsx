import React, { useEffect, useState } from "react";
import API from "../../../api/api";
import { useNavigate } from "react-router-dom";

export default function PracticeQuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create Quiz Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [creating, setCreating] = useState(false); // ✅ new state

  const navigate = useNavigate();

  const loadPracticeQuizzes = async () => {
    try {
      const res = await API.get("/student/quizzes"); // ✅ Make sure this matches backend
      const uniqueQuizzes = res.data.filter(
        (q, index, self) => index === self.findIndex((t) => t._id === q._id)
      );
      setQuizzes(uniqueQuizzes);
    } catch (err) {
      console.error(err);
      alert("Failed to load practice quizzes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPracticeQuizzes();
  }, []);

  // -----------------------
  // Create Quiz Handler
  // -----------------------
  const createQuiz = async (e) => {
    e.preventDefault();

    if (!topic) {
      alert("Topic is required");
      return;
    }

    try {
      setCreating(true); // ✅ start creating
      await API.post("/student/quizzes", {
        topic,
        numQuestions: Number(numQuestions), // ✅ Convert to number
      });

      setShowCreateModal(false);
      setTopic("");
      setNumQuestions(5);

      await loadPracticeQuizzes(); // refresh list
      alert("Quiz Created Successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating quiz");
    } finally {
      setCreating(false); // ✅ stop creating
    }
  };

  if (loading) return <h2 className="p-6 text-xl">Loading Practice Quizzes...</h2>;

  return (
    <div className="p-6 space-y-4">

      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Your Practice Quizzes</h1>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          ➕ Create Quiz
        </button>
      </div>

      {/* Quiz List */}
      {quizzes.length === 0 ? (
        <p className="text-gray-600">You haven't created any practice quiz yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizzes.map((quiz, index) => (
            <div
              key={quiz._id + "-" + index}
              className="border p-4 rounded-xl shadow bg-white"
            >
              <h3 className="text-xl font-bold">{quiz.title}</h3>
              <p className="text-gray-600">Topic: {quiz.topic}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(quiz.createdAt).toLocaleString()}
              </p>

              <button
                onClick={() => navigate(`/student/practice-quiz/${quiz._id}`)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Start Quiz →
              </button>

              <button
                onClick={() => navigate(`/student/practice-quiz/${quiz._id}/delete`)}
                className="mt-3 ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Quiz Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-start justify-center pt-20">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create Practice Quiz</h2>

            <form onSubmit={createQuiz}>
              <label className="block mb-2 font-semibold">Topic</label>
              <input
                type="text"
                className="border w-full px-3 py-2 rounded mb-4"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />

              <label className="block mb-2 font-semibold">Number of Questions</label>
              <input
                type="number"
                className="border w-full px-3 py-2 rounded mb-6"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                min="1"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  disabled={creating} // disable while creating
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  disabled={creating} // disable while creating
                >
                  {creating ? "Creating Quiz... Please wait" : "Create"} {/* ✅ loading text */}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
