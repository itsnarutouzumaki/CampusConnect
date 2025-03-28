import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate(); // Initialize navigation

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const url = "http://localhost:8000/teachers/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const api = await axios.post(
        url,
        {
          email: formData.email,
          password: formData.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(api.data);
      setSuccessMessage("Login successful!");

      // Redirect to Profile page
      navigate("/teacher/profile");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed!");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <div className="w-full max-w-lg p-6 bg-gray-900 rounded-lg shadow-lg">
        <header className="text-2xl font-semibold text-center mb-6">Login</header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address <span className="text-red-600 ml-1">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password <span className="text-red-600 ml-1">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg"
              required
            />
          </div>

          <button type="submit" className="w-full bg-teal-600 py-2 rounded-lg hover:bg-teal-700 transition">
            Login
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {successMessage && <p className="mt-4 text-green-500 text-center">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
