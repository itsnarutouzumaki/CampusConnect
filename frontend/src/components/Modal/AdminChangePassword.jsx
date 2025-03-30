import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const ChangePassword = ({ closeModal }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New passwords don't match!");
      return;
    }
    if (passwords.newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // Here you would typically make an API call to change the password
    console.log("Password change data:", passwords);
    
    // Reset form and close modal on success
    setError("");
    closeModal();
  };

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-gray-900 text-white p-6 rounded-lg max-w-lg w-full sm:w-[500px] z-50 flex flex-col text-center shadow-lg hover:border-2 hover:border-white hover:shadow-2xl hover:shadow-gray-500 transition-all justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-black underline text-white text-lg my-3">
          Change Password
        </h3>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={passwords.currentPassword}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={passwords.newPassword}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Repeat New Password"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={passwords.confirmPassword}
          required
        />
        <button
          className="m-2 rounded-lg p-2 bg-blue-400 w-fit hover:bg-gradient-to-r from-[#ee7f7f] via-[#a377ae] to-[#7bdcd3] hover:text-black font-bold cursor-pointer"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
    </div>,
    document.querySelector(".myPortalModalDiv")
  );
};

export default ChangePassword;