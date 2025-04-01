import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginSignupForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const url = isLogin
      ? "/api/students/studentlogin"
      : "/api/students/studentregister";
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          fullname: formData.fullName,
          email: formData.email,
          password: formData.password,
        };
    try {
      const { data, status } = await axios.post(url, payload);
      if (isLogin && status === 200) {
        localStorage.setItem("userName", data.data.student.fullname);
        localStorage.setItem("studentId", data.data.student._id);
      }
      toast.success(isLogin ? "You loggedin successfully!" : "Student signedup successfully!", {
        position: "top-center",
        duration: 2000,
      });

      if (isLogin) {
        navigate("/course");
      } else {
        navigate("/login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <div className="w-full max-w-lg p-6 bg-gray-900 rounded-lg shadow-lg">
        <header className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Login" : "Signup"}
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium">
                Full Name <span className="text-red-600 ml-1">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg"
                required
              />
            </div>
          )}

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

          <button
            type="submit"
            className="w-full bg-teal-600 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <div className="mt-5 flex justify-center">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </p>
          &nbsp;&nbsp;
          <span
            className="text-red-600 hover:underline transition cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Switch to Signup" : "Switch to Login"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;
