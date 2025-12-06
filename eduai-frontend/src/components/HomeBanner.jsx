// src/components/HomeBanner.jsx
import { FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HomeBanner() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background gradient: black → purple */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-purple-700 to-purple-500 animate-gradient-x"></div>

      {/* Floating shapes with motion and glow */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400 rounded-full opacity-50 animate-float-slow mix-blend-multiply shadow-[0_0_60px_rgba(6,182,212,0.5)]"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-500 rounded-full opacity-50 animate-float-slower mix-blend-multiply shadow-[0_0_80px_rgba(244,63,94,0.5)]"></div>
      <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-teal-400 rounded-full opacity-40 animate-float mix-blend-multiply shadow-[0_0_40px_rgba(20,184,166,0.5)]"></div>
      <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-yellow-400 rounded-full opacity-45 animate-float-slow mix-blend-multiply shadow-[0_0_70px_rgba(250,204,21,0.5)]"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-fuchsia-400 rounded-full opacity-40 animate-float-slower mix-blend-multiply shadow-[0_0_50px_rgba(192,38,211,0.5)]"></div>
      <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-lime-400 rounded-full opacity-45 animate-float mix-blend-multiply shadow-[0_0_50px_rgba(132,204,22,0.5)]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center px-6">
        {/* Logo + Title */}
        <div className="flex items-center justify-center mb-6 space-x-3">
          <FaRobot className="text-6xl text-white animate-spin-slow" />
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-red-400 to-pink-500 animate-text-gradient">
            EduAI
          </h1>
        </div>

        {/* Headline */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Create AI-powered quizzes and courses, and learn smarter!
        </h2>

        {/* Subtext */}
        <p className="text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          EduAI helps teachers generate intelligent quizzes automatically using AI. Students can enroll in courses, take quizzes, and practice anytime.
        </p>

        {/* Call-to-action buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 border border-white/30 hover:border-white rounded-lg font-semibold transition"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(-10px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 10s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes text-gradient { 0%, 100% { background-position: 0% } 50% { background-position: 100% } }
        .animate-text-gradient { background-size: 200% 200%; animation: text-gradient 5s ease infinite; }
      `}</style>
    </section>
  );
}
