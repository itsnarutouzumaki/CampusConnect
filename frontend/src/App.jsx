import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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

const App = () => {
  return (
    <div className="app_container min-h-screen flex flex-col">
      <Router>
        <MainContent className='flex-grow' />
      </Router>
      <CopyrightFooter />
    </div>
  );
};

const MainContent = () => {
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  return (
    <>
      {!isLandingPage && location.pathname !== '/teacher/login' && <Navbar />}

      <div className="min-h-fit flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/loginsignup" element={<LoginSignupForm />} />
          <Route path="/course" element={<Course />} />
          <Route path="/coursedetails" element={<CourseDetails/>} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/contactUs" element={<ContactUsForm />} />
          <Route path="/dashboard" element={<HomeScreen />} />
          <Route path="/teacher/login" element={<TeacherLoginForm />} />
          <Route path="/teacher/profile" element={<TeacherProfile />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path='/profile' element={<ShowStudent />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
