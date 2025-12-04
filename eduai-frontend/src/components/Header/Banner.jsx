// src/components/Banner.jsx
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Learn Smarter with EduAI
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
        Access up-to-date courses, AI-powered quizzes, and our latest features to accelerate your learning journey.
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/register"
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
        <Link
          to="/courses"
          className="px-6 py-3 border border-white rounded hover:bg-white hover:text-indigo-600 transition"
        >
          Explore Courses
        </Link>
      </div>
    </div>
  );
}
