// src/pages/HomePage.jsx
import HomeBanner from "../components/HomeBanner";
import { FaRobot, FaBookOpen, FaGraduationCap, FaQuestionCircle } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <HomeBanner />

      {/* Features / Services Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AI Quiz Generator */}
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer text-center">
            <FaRobot className="text-indigo-600 text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">AI Quiz Generator</h3>
            <p className="text-gray-600">
              Automatically generate quizzes for any topic with AI-powered intelligence.
            </p>
          </div>

          {/* Course Creation */}
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer text-center">
            <FaBookOpen className="text-green-600 text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Course Creation</h3>
            <p className="text-gray-600">
              Teachers can create and manage courses efficiently for students to enroll.
            </p>
          </div>

          {/* Practice Quizzes */}
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer text-center">
            <FaQuestionCircle className="text-pink-600 text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Practice Quizzes</h3>
            <p className="text-gray-600">
              Students can take practice quizzes to strengthen their understanding.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About EduAI</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            EduAI is an AI-powered learning platform where teachers can create courses and generate quizzes automatically. Students can enroll in courses, practice quizzes, and track their progress effortlessly. Our mission is to make learning smarter and more interactive.
          </p>
        </div>
      </section>

      {/* Call-to-action Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white text-center rounded-t-3xl relative overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full animate-pulse-slower mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/10 rounded-full animate-pulse-slower mix-blend-multiply"></div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Join EduAI today and experience AI-powered learning like never before.
        </p>
        <a
          href="/register"
          className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-white/90 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
}
