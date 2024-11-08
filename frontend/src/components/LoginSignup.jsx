import React, { useState } from "react";
import "./LoginSignup.css"; // Import your CSS file

const LoginSignupForm = () => {
  const [isSignupActive, setIsSignupActive] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false); // New state to track if the user is a Teacher
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleToggleForm = () => {
    setIsSignupActive(!isSignupActive);
    setFormData({ fullName: "", email: "", password: "" });
    setError("");
    setSuccessMessage("");
  };

  const handleUserTypeChange = (e) => {
    setIsTeacher(e.target.value === "Teacher");
    setFormData({ fullName: "", email: "", password: "" });
    setError("");
    setSuccessMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const url = isTeacher
      ? "http://localhost:5000/api/auth/login/teacher"
      : isSignupActive
      ? "http://localhost:5000/api/auth/login/student"
      : "http://localhost:5000/api/auth/signup/student";

    const payload = isSignupActive
      ? {
          
          email: formData.email,
          password: formData.password,
        }
      : {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccessMessage(isSignupActive ? "Signup successful!" : "Login successful!");
      if (!isSignupActive || isTeacher) {
        // Save the token if it's a login
        // localStorage.setItem("token", data.token);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center align-middle m-4">
      <section className={`wrapper ${isSignupActive ? "active" : ""}`}>
        <div className="user-type-toggle">
          <label>
            <input
              type="radio"
              value="Student"
              checked={!isTeacher}
              onChange={handleUserTypeChange}
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              value="Teacher"
              checked={isTeacher}
              onChange={handleUserTypeChange}
            />
            Teacher
          </label>
        </div>

        {isTeacher ? (
          // Login form for Teacher
          <div className="form login">
            <header>Teacher Login</header>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input type="submit" value="Login" />
            </form>
          </div>
        ) : (
          // Signup/Login form for Student
          <div className={`form ${isSignupActive ? "signup" : "login"}`}>
            <header onClick={handleToggleForm}>
              {isSignupActive ? "Student Signup" : "Student Login"}
            </header>
            <form onSubmit={handleSubmit}>
              {isSignupActive && (
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required={isSignupActive}
                />
              )}
              <input
                type="text"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {isSignupActive && (
                <div className="checkbox">
                  <input type="checkbox" id="signupCheck" required />
                  <label htmlFor="signupCheck">I accept all terms & conditions</label>
                </div>
              )}
              <input type="submit" value={isSignupActive ? "Signup" : "Login"} />
            </form>
          </div>
        )}
        
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </section>
    </div>
  );
};

export default LoginSignupForm;
