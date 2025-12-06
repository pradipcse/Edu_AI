import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../api/api";

export default function TeacherCreateQuiz() {
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title || !topic) return alert("Title & Topic required");

    setLoading(true);
    try {
      await API.post("/quiz", { title, topic, courseId, numQuestions });
      alert("Quiz created successfully!");
      navigate(`/teacher/courses/${courseId}/quizzes`);
    } catch (err) {
      console.error(err);
      alert("Failed to create quiz");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create AI Quiz</h2>

      <input
        className="w-full p-2 border rounded mb-3"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded mb-3"
        placeholder="Topic (e.g. Networking)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded mb-3"
        type="number"
        min="1"
        value={numQuestions}
        onChange={(e) => setNumQuestions(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Create AI Quiz"}
      </button>
    </div>
  );
}
