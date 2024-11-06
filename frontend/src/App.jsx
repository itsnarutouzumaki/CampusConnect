import React from "react";
import Navbar from "./components/Students/Navbar";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import "./app.css";
import LoginSignupForm from "./components/Students/LoginSignup";
import Course from "./components/Students/Course";
import Assignment from "./components/Students/Assignment";
import CopyrightFooter from "./components/Students/Footer";
import ContactUsForm from "./components/Students/Contact";
import HomeScreen from "./components/Students/Dashboard";
import TeacherLoginForm from "./components/Teacher/Login";
import TeacherProfile from "./components/Teacher/Profile";
import AdminProfile from "./components/Admin";

const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/teacher/login' && <Navbar />}
      <div className="min-h-[81vh] w-full">
        <Routes>
          <Route path="/" element={<LoginSignupForm />} />
          <Route path="/loginsignup" element={<LoginSignupForm />} />
          <Route path="/course" element={<Course />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/contactUs" element={<ContactUsForm />} />
          <Route path="/dashboard" element={<HomeScreen />} />
          <Route path="/teacher/login" element={<TeacherLoginForm />} />
          <Route path="/teacher/profile" element={<TeacherProfile />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Routes>
      </div>
      <CopyrightFooter />
    </>
  );
};

export default App;