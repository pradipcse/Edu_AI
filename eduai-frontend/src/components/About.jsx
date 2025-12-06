// src/pages/AboutUs.jsx
import { FaUsers, FaLightbulb, FaRocket } from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-white min-h-screen py-16 px-6">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About EduAI
        </h1>
        <p className="text-gray-500 text-lg">
          EduAI is an AI-powered learning platform designed to make teaching and learning smarter, faster, and more engaging. Our mission is to empower teachers to create dynamic courses and quizzes, while providing students with tools to learn effectively.
        </p>
      </div>

      {/* Our Mission / Vision / Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
          <div className="flex justify-center mb-4">
            <FaLightbulb className="text-yellow-500 text-4xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
          <p className="text-gray-500">
            To revolutionize education by leveraging AI technology, making learning more personalized, interactive, and accessible for everyone.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
          <div className="flex justify-center mb-4">
            <FaUsers className="text-indigo-500 text-4xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Team</h3>
          <p className="text-gray-500">
            A passionate team of educators, developers, and AI enthusiasts committed to creating a smarter, more effective learning platform.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
          <div className="flex justify-center mb-4">
            <FaRocket className="text-pink-500 text-4xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
          <p className="text-gray-500">
            To empower teachers and students through AI-driven tools, making education more engaging, personalized, and efficient for all.
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Join EduAI Today
        </h2>
        <p className="text-gray-500 mb-6">
          Whether you are a teacher creating courses or a student taking quizzes, EduAI makes education smarter and fun.
        </p>
        <a
          href="/register"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Get Started
        </a>
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-400">© {new Date().getFullYear()} EduAI. All Rights Reserved.</p>
      </div>
    </div>
  );
}
