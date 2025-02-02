import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Students/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginSignupForm from "./components/Students/LoginSignup";
import Course from "./components/Students/Course";
import Assignment from "./components/Students/Assignment";
import CopyrightFooter from "./components/Students/Footer";
import ContactUsForm from "./components/Students/Contact";
import HomeScreen from "./components/Students/Dashboard";
import TeacherLoginForm from "./components/Teacher/Login";
import TeacherProfile from "./components/Teacher/Profile";
import AdminProfile from "./components/Admin";
import "./app.css";
import CourseDetails from "./components/Students/CourseDetails";
import ShowStudent from "./components/ShowStudent";
import Leaderboard from "./components/LeaderBoard";
import TeacherCourseDetails from "./components/Teacher/CourseDetails";
import ParticlesComponent from "./styles/Particlebackground.jsx";
import About from "./components/About.jsx";


const App = () => {
  return (
    <div className="app_container">
      <div>
        <ParticlesComponent />
      </div>
      <Router>
        <MainContent />
        <CopyrightFooter />
      </Router>
    </div>
  );
};

const MainContent = () => {
  const location = useLocation();

  // Display Navbar on all pages except landing and teacher login pages
  const isLandingPage = location.pathname === "/";
  const isTeacherLogin = location.pathname === "/teacher/login";

  return (
    <>
      {!isLandingPage && !isTeacherLogin && <Navbar />}

      <div className="min-h-fit flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/loginsignup" element={<LoginSignupForm />} />
          <Route path="/course" element={<Course />} />
          <Route path="/coursedetails" element={<CourseDetails />} />
          <Route
            path="/TeacherCourseDetails"
            element={<TeacherCourseDetails />}
          />
          <Route path="/contactUs" element={<ContactUsForm />} />
          <Route path="/dashboard" element={<HomeScreen />} />
          <Route path="/teacher/login" element={<TeacherLoginForm />} />
          <Route path="/teacher/profile" element={<TeacherProfile />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/profile" element={<ShowStudent />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route
            path="/teacher/coursedetails"
            element={<TeacherCourseDetails />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
