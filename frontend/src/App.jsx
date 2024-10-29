import React from "react";
import Navbar from "./Navbar";
import "./app.css";
import LoginSignupForm from "./LoginSignup";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="app_container">
        <LoginSignupForm />
      </div>
    </div>
  );
};

export default App;
