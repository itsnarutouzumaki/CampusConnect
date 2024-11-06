import React, { useState } from "react";
import "./LoginSignup.css"; // Import your CSS file

const LoginSignupForm = () => {
  const [isSignupActive, setIsSignupActive] = useState(false);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const url = isSignupActive ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/signup";
    console.log(url);
    const payload = isSignupActive
      ? {
          email: formData.email,
          password: formData.password,
        }
      : {fullName: formData.fullName,email: formData.email, password: formData.password };

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

      setSuccessMessage(
        isSignupActive ? "Signup successful!" : "Login successful!"
      );
      if (!isSignupActive) {
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
        <div className="form signup">
          <header onClick={handleToggleForm}>Signup</header>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              required={isSignupActive}
            />
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
            <div className="checkbox">
              <input
                type="checkbox"
                id="signupCheck"
                required={isSignupActive}
              />
              <label htmlFor="signupCheck">
                I accept all terms & conditions
              </label>
            </div>
            <input type="submit" value="Signup" />
          </form>
        </div>

        <div className="form login">
          <header onClick={handleToggleForm}>Login</header>
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
            <a href="#">Forgot password?</a>
            <input type="submit" value="Login" />
          </form>
        </div>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </section>
    </div>
  );
};

export default LoginSignupForm;
