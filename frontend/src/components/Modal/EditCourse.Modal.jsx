import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

const EditCourse = ({ closeModal, courseData }) => {
  const [formData, setFormData] = useState({
    name: courseData?.name || "",
    expiryDate: courseData?.expiryDate || "",
    expiryTime: courseData?.expiryTime || "",
    description: courseData?.description || "",
    driveLink: courseData?.driveLink || ""
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
    // Validate all required fields
    if (!formData.name || !formData.expiryDate || !formData.expiryTime || !formData.driveLink) {
      setError("Please fill all required fields");
      return;
    }
 // Validate URL format
    try {
      new URL(formData.driveLink);
    } catch (e) {
      setError("Please enter a valid Google Drive URL");
      return;
    }

    try {
      // Here you would typically make an API call to update the course
      // Example:
      // const response = await axios.put(`/courses/${courseData.id}`, formData);
     // console.log("Updating course:", formData);
      const response=axios.put("/api/course/updatecourse",
        {
          course_id:'67e91feea1165b29f8080a9f',
          title:formData.name,
          expiryDate:formData.expiryDate,
          description:formData.description,
          pdfLink:formData.driveLink
        }
      );
     
      // On success:
      setError("");
      closeModal();
    } catch (err) {
      setError("Failed to update course. Please try again.");
      console.error("Error updating course:", err);
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
          Edit Course
        </h3>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.name}
          required
        />
        <input
          type="date"
          name="expiryDate"
          placeholder="Expiry Date"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.expiryDate}
          required
        />
        <input
          type="time"
          name="expiryTime"
          placeholder="Expiry Time"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.expiryTime}
          required
        />
        <textarea
          name="description"
          placeholder="Course Description"
          className="m-2 rounded-lg p-2 w-[80%] h-24 text-black"
          onChange={handleInputChange}
          value={formData.description}
        />
        <input
          type="url"
          name="driveLink"
          placeholder="Google Drive Link"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.driveLink}
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

export default EditCourse;