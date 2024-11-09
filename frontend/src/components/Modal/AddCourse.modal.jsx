import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const AddCourse = ({ closeModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
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
          Add Course
        </h3>
        <input
          type="text"
          placeholder="Course Name"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          required
        />
        <input
          type="text"
          placeholder="Choose Unique Course ID"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          required
        />
        <input
          type="date"
          placeholder="Expiry Date"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          required
        />
        <input
          type="time"
          placeholder="Expiry Time"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          required
        />
        <textarea
          placeholder="Course Description"
          className="m-2 rounded-lg p-2 w-[80%] h-24 text-black"
          required
        />
        <input
          type="url"
          placeholder="Google Drive Link"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          required
        />
        <div>
          <input type="file" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            className="m-2 rounded-lg p-2 bg-blue-400 w-fit hover:bg-gradient-to-r from-[#ee7f7f] via-[#a377ae] to-[#7bdcd3] hover:text-black font-bold cursor-pointer"
          >
            Upload
          </button>
        </div>
        <button
          className="m-2 rounded-lg p-2 bg-blue-400 w-fit hover:bg-gradient-to-r from-[#ee7f7f] via-[#a377ae] to-[#7bdcd3] hover:text-black font-bold cursor-pointer"
          onClick={closeModal}
        >
          Add Course
        </button>
      </div>
    </div>,
    document.querySelector(".myPortalModalDiv")
  );
};

export default AddCourse;
