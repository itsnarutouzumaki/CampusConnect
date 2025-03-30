import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const EditAssignment = ({ closeModal, assignmentData }) => {
  const [formData, setFormData] = useState({
    title: assignmentData?.title || "",
    date: assignmentData?.date || "",
    time: assignmentData?.time || "",
    url: assignmentData?.url || ""
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
    if (!formData.title || !formData.date || !formData.time || !formData.url) {
      setError("All fields are required!");
      return;
    }

    try {
      // Here you would typically make an API call to update the assignment
      // Example:
      // const response = await axios.put(`/assignments/${assignmentData.id}`, formData);
      console.log("Updating assignment:", formData);
      
      // On success:
      setError("");
      closeModal();
    } catch (err) {
      setError("Failed to update assignment. Please try again.");
      console.error("Error updating assignment:", err);
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
          Edit Assignment
        </h3>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          name="title"
          placeholder="Assignment Name"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.title}
          required
        />
        <input
          type="date"
          name="date"
          placeholder="Expiry Date"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.date}
          required
        />
        <input
          type="time"
          name="time"
          placeholder="Expiry Time"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.time}
          required
        />
        <input
          type="url"
          name="url"
          placeholder="Google Drive Link"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.url}
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

export default EditAssignment;