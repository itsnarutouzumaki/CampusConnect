import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const ChangeCourseCoordinator = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    courseId: "",
    coordinator: "",
    password: ""
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.courseId || !formData.coordinator || !formData.password) {
      setError("All fields are required!");
      return;
    }

    try {
      // Here you would typically make an API call to change the coordinator
      // Example:
      // const response = await axios.post('/api/change-coordinator', formData);
      console.log("Submitting:", formData);
      
      // On success:
      setError("");
      closeModal();
    } catch (err) {
      setError("Failed to update coordinator. Please try again.");
      console.error("Error changing coordinator:", err);
    }
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
          Change Course Coordinator
        </h3>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          name="courseId"
          placeholder="Course ID"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.courseId}
          required
        />
        <input
          type="text"
          name="coordinator"
          placeholder="New Course Coordinator Email"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.coordinator}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Your Password"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.password}
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

export default ChangeCourseCoordinator;