import React from "react";
import Navbar from "./components/Students/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./app.css";
import LoginSignupForm from "./components/Students/LoginSignup";
import Course from "./components/Students/Course";
import Assignment from "./components/Students/Assignment";
import CopyrightFooter from "./components/Students/Footer";
import ContactUsForm from "./components/Students/Contact";
import HomeScreen from "./components/Students/Dashboard";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-[81vh] w-full">
      <Routes>
        <Route path="/" element={<LoginSignupForm />} />     
        <Route path="/loginsignup" element={<LoginSignupForm />} />
        <Route path="/course" element={<Course />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/contactUs" element={<ContactUsForm />} />
        <Route path="/dashboard" element={<HomeScreen />} />
      </Routes>
      </div>
      <CopyrightFooter/>
    </Router>
  );
};

export default App;
