import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Quiz from "./components/Quiz.jsx";
import AddQuiz from "./components/AddQuiz.jsx";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginSignupForm from "./components/Students/LoginSignup";
import Course from "./components/Students/Course";
import CopyrightFooter from "./components/Footer.jsx";
import ContactUsForm from "./components/Contact.jsx";
import HomeScreen from "./components/Students/Dashboard";
import TeacherLoginForm from "./components/Teacher/Login";
import TeacherProfile from "./components/Teacher/Profile";
import AdminProfile from "./components/Admin/Admin.jsx";
import "./app.css";
import CourseDetails from "./components/Students/CourseDetails";
import ShowStudent from "./components/ShowStudent";
import Leaderboard from "./components/LeaderBoard";
import TeacherCourseDetails from "./components/Teacher/CourseDetails";
import ParticlesComponent from "./styles/Particlebackground.jsx";
import About from "./components/About.jsx";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./components/Admin/Login.jsx";
import QuizWindow from "./components/Students/Quiz_Window";
import Error from "./components/Error.jsx";
import ViewResult from "./components/Students/ViewResult.jsx";
const App = () => {
  return (
    <>
      <div className="app_container">
        <div>
          <ParticlesComponent />
        </div>
        <Router>
          <MainContent />
        </Router>
      </div>
      <div className="bg-black">
        <CopyrightFooter />
      </div>
    </>
  );
};

const MainContent = () => {
  const location = useLocation();

  const showNavbar =
    location.pathname === "/" ||
    location.pathname.includes("login") ||
    location.pathname.includes("admin") ||
    location.pathname.includes("teacher");

  return (
    <>
      <Toaster position="top-center" />

      {!showNavbar && <Navbar />}

      <div className="">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/loginsignup" element={<LoginSignupForm />} />
          <Route path="/course" element={<Course />} />
          <Route path="/coursedetails/:courseId" element={<CourseDetails />} />
          <Route path="/contactUs" element={<ContactUsForm />} />
          <Route path="/dashboard" element={<HomeScreen />} />
          <Route path="/profile/:username" element={<ShowStudent />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/quiz/:id" element={<QuizWindow />} />
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<Error />} />
          <Route path="/viewresult" element={<ViewResult />} />
          {/* teacher section */}
          <Route
            path="/teacher/coursedetails/:courseId"
            element={<TeacherCourseDetails />}
          />
          <Route path="/teacher/login" element={<TeacherLoginForm />} />
          <Route path="/teacher/profile" element={<TeacherProfile />} />
          <Route path="/teacher/addquiz" element={<AddQuiz />} />

          {/* Admin Section */}
          <Route path="/admin" element={<AdminProfile />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
