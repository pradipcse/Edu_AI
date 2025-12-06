// src/pages/Services.jsx
import { FaRobot, FaBook, FaChalkboardTeacher, FaGraduationCap, FaLaptopCode, FaClipboardCheck } from "react-icons/fa";

const servicesData = [
  {
    icon: <FaRobot className="text-indigo-500 text-4xl" />,
    title: "AI Quiz Generator",
    description: "Generate quizzes automatically using AI for any topic, saving time and effort."
  },
  {
    icon: <FaBook className="text-purple-500 text-4xl" />,
    title: "Course Creation",
    description: "Easily create courses with lessons, materials, and AI-assisted content suggestions."
  },
  {
    icon: <FaChalkboardTeacher className="text-pink-500 text-4xl" />,
    title: "Teacher Dashboard",
    description: "Manage your courses, quizzes, and student progress in one intuitive dashboard."
  },
  {
    icon: <FaGraduationCap className="text-green-500 text-4xl" />,
    title: "Student Dashboard",
    description: "Track your courses, enrollments, and quiz results with a clean student interface."
  },
  {
    icon: <FaLaptopCode className="text-yellow-500 text-4xl" />,
    title: "Practice Quizzes",
    description: "Create practice quizzes to improve your skills and knowledge in different topics."
  },
  {
    icon: <FaClipboardCheck className="text-red-500 text-4xl" />,
    title: "Course Enrollment",
    description: "Easily enroll in courses and start learning instantly with AI-powered content."
  },
];

export default function Services() {
  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Our Services
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          EduAI is a modern AI-powered learning platform. Here’s what we offer for teachers and students.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
          >
            <div className="flex justify-center mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-500">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-400">© {new Date().getFullYear()} EduAI. All Rights Reserved.</p>
      </div>
    </div>
  );
}
