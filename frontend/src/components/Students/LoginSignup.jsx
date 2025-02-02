import React, { useState } from "react";

const LoginSignupForm = () => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Toggle between Signup/Login for students
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUserTypeChange = (e) => {
    setIsTeacher(e.target.value === "Teacher");
    setIsLogin(false); // Reset login state when switching roles
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
      : isLogin
      ? "http://localhost:5000/api/auth/login/student"
      : "http://localhost:5000/api/auth/signup/student";

    const payload = isTeacher || isLogin
      ? { email: formData.email, password: formData.password }
      : { fullName: formData.fullName, email: formData.email, password: formData.password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      setSuccessMessage(
        isTeacher
          ? "Teacher login successful!"
          : isLogin
          ? "Student login successful!"
          : "Student signup successful!"
      );
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen  text-white">
      <div className="w-full max-w-lg p-6 bg-gray-900 rounded-lg shadow-lg">
        <header className="text-2xl font-semibold text-center mb-6">
          {isTeacher ? "Teacher Login" : isLogin ? "Student Login" : "Student Signup"}
        </header>

        <div className="mb-4 flex justify-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="Student"
              checked={!isTeacher}
              onChange={handleUserTypeChange}
            />
            <span>Student</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="Teacher"
              checked={isTeacher}
              onChange={handleUserTypeChange}
            />
            <span>Teacher</span>
          </label>
        </div>

        {!isTeacher && (
          <div className="mb-5  flex justify-center space-x-10">
            <button className={`${!isLogin ? "bg-teal-600" : "bg-gray-700"} px-4 py-2 rounded-lg`} onClick={() => setIsLogin(false)}>Signup</button>
            <button className={`${isLogin ? "bg-teal-600" : "bg-gray-700"} px-4 py-2 rounded-lg`} onClick={() => setIsLogin(true)}>Login</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isTeacher && !isLogin && (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium">Full Name</label>
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
            <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
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
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
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
            {isTeacher || isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {successMessage && <p className="mt-4 text-green-500 text-center">{successMessage}</p>}
      </div>
    </div>
  );
};

export default LoginSignupForm;
