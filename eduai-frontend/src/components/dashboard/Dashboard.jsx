// src/components/Dashboard.jsx
import { useSelector } from "react-redux";
import StudentDashboard from "./student/StudentDashboard"
import TeacherDashboard from "./teacher/TeacherDashboard"

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500">
        You are not logged in.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {user.role === "student" ? <StudentDashboard /> : <TeacherDashboard />}
    </div>
  );
}
