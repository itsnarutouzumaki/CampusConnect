import React from "react";
import { Link } from "react-router-dom";
import "./landingpage.css";
import ParticlesComponent from "../../styles/Particlebackground";

const LandingPage = () => {
  return (
    <div className="landing-container">

      <div id="particles">
        {/* Teacher Login Button in the top-right corner */}
        <div className="teacher-login-btn">
          <Link to="/teacher/login" className="teacher-login-link">
            Teacher Login
          </Link>
        </div>

        {/* Main Welcome Message */}
        <h1 className="welcome-heading">
          Welcome to <span className="highlighted-text">CampusConnect.Com</span>
        </h1>

        {/* Subtitle */}
        <p className="welcome-subtitle">
          "Transform your college experience. Track progress, earn rewards, and
          collaborate. Welcome to the future of academic life. Join us today!"
        </p>

        {/* Discover More Button */}
        <Link to="/loginsignup" className="discover-btn">
          Discover More
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
