import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api/api";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post("/courses", { title, description });
      alert("Course created successfully");
      navigate("/teacher/courses");
    } catch {
      alert("Failed to create course");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>

      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="text"
          placeholder="Course Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Course Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Create Course
        </button>
      </form>
    </div>
  );
}
