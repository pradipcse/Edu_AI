// src/pages/Home.jsx
import { Link } from "react-router-dom";
import Banner from "./Header/Banner"; // ✅ import Banner

export default function Home() {
  return (
    <div>
      {/* Banner Section */}
      <Banner />

      {/* Existing Home content */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
        <h1 className="text-5xl font-bold mb-6">Welcome to EduAI</h1>

        <p className="text-lg mb-8 text-center max-w-xl">
          Explore courses, practice quizzes, and enhance your learning experience with AI-powered guidance.
        </p>

        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-indigo-800 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
