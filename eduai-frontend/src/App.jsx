// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Dashboard from "./components/dashboard/Dashboard";
import PracticeQuizList from "./components/dashboard/student/PracticeQuizList";
import PracticeQuizView from "./components/dashboard/student/PracticeQuizView";
import CreateCourse from "./components/dashboard/teacher/CreateCourse";
import TeacherCourses from "./components/dashboard/teacher/TeacherCourse";
import StudentsList from "./components/dashboard/teacher/StudentList";
import TeacherCreateQuiz from "./components/dashboard/teacher/TeacherCreateQuiz";
import TeacherQuizList from "./components/dashboard/teacher/TeacherQuizList";
import Services from "./components/Services";
import About from "./components/About";
import StudentCourseDetail from "./components/dashboard/student/StudentCoueseDetails";
import TakeQuiz from "./components/dashboard/student/TakeQuiz";

// import About from "./pages/About";
// import Services from "./pages/Services";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<About/>} />
          <Route path="/services" element={<Services />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student/practice-quizzes" element={<PracticeQuizList />} />
          <Route path="/student/practice-quiz/:id" element={<PracticeQuizView />} />
          <Route path="/teacher/create-course" element={<CreateCourse />} />
          <Route path="/teacher/courses" element={<TeacherCourses />} />
          <Route path="/teacher/courses/:courseId/students" element={<StudentsList />} />

          {/* <Route path="/teacher/quiz/create" element={<CreateQuiz />} />
          <Route path="/teacher/quizzes" element={<TeacherQuizzes />} /> */}
          <Route path="/teacher/courses/:courseId/quizzes/create" element={<TeacherCreateQuiz />}/>
          <Route path="/teacher/courses/:courseId/quizzes"element={<TeacherQuizList />}/>
          <Route path="/course/:courseId" element={<StudentCourseDetail />} />
           <Route path="/student/quiz/:quizId" element={<TakeQuiz />} />




        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
