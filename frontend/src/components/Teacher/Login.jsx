import React from 'react';

const TeacherLoginForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <header className="text-2xl font-semibold text-center mb-6">Login</header>
        <form action="#">
          <input
            type="text"
            placeholder="Email address"
            required
            className="w-full p-2 mb-4 border rounded focus:outline-none
            bg-slate-300 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-2 mb-4 border bg-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <a href="#" className="text-blue-500 text-sm hover:underline mb-4 block text-center">
            Forgot password?
          </a>
          <input
            type="submit"
            value="Login"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default TeacherLoginForm;