import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./app.css";
import LoginSignupForm from "./components/LoginSignup";
import Course from "./components/Course";
import Assignment from "./components/Assignment";
import CopyrightFooter from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginSignupForm />} />     
        <Route path="/loginsignup" element={<LoginSignupForm />} />
        <Route path="/course" element={<Course />} />
        <Route path="/assignment" element={<Assignment />} />
      </Routes>
      <CopyrightFooter/>
    </Router>
  );
};

export default App;
