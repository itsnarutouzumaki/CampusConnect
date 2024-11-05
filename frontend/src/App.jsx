import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./app.css";
import LoginSignupForm from "./components/LoginSignup";
import Course from "./components/Course";
import Assignment from "./components/Assignment";
import CopyrightFooter from "./components/Footer";
import ContactUsForm from "./components/Contact";
import HomeScreen from "./components/Dashboard";

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
