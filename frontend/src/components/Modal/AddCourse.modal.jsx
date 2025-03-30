import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const AddCourse = ({ closeModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState({
    title: "",
    courseId: "",
    coordinator: "",
    startDate: "",
    expiryDate: "",
    description: "",
    pdfLink: "",
    Price: "",
  });

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const formData=new FormData();
    formData.append("title",data.title);
    formData.append("courseId",data.courseId);
    formData.append("coordinator",data.coordinator);
    formData.append("startDate",data.startDate);
    formData.append("expiryDate",data.expiryDate);
    formData.append("description",data.description);
    formData.append("pdfLink", data.pdfLink);
    formData.append("price", data.Price);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
  });
    if (selectedFile) {
      
      formData.append("file", selectedFile);

      // try {
      //   await axios.post("/api/upload", formData, {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   });
      // } catch (error) {
      //   console.error("Error uploading file:", error);
      //   alert("File upload failed.");
      //   return;
      // }
    }

    
    try {

      await axios.post("/api/course/addcourse", formData);
      alert("Course added successfully!");
      closeModal();
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course.");
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
          name="title"
          placeholder="Course Name"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={data.title}
          required
        />
        <input
          type="text"
          name="courseId"
          placeholder="Choose Unique Course ID"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={data.courseId}
          required
        />
        <input
          type="text"
          name="coordinator"
          placeholder="Course Coordinator email"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={data.coordinator}
          required
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={data.startDate}
          required
        />
        <input
          type="date"
          name="expiryDate"
          placeholder="Expiry Date"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={data.expiryDate}
          required
        />
        <textarea
          name="description"
          placeholder="Course Description"
          className="m-2 rounded-lg p-2 w-[80%] h-24 text-black"
          onChange={handleInputChange}
          value={data.description}
          required
        />
        <input
          type="url"
          name="pdfLink"
          placeholder="Course Details PDF(GoogleDrive Link)"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={data.pdfLink}
          required
        />
        <input
          type="text"
          name="Price"
          placeholder="Price"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={data.Price}
          required
        />
        <div>
          <input type="file" onChange={handleFileChange} />
          <button
            onClick={handleSubmit}
            className="m-2 rounded-lg p-2 bg-blue-400 w-fit hover:bg-gradient-to-r from-[#ee7f7f] via-[#a377ae] to-[#7bdcd3] hover:text-black font-bold cursor-pointer"
          >
            Add Course
          </button>
        </div>
      </div>
    </div>,
    document.querySelector(".myPortalModalDiv")
  );
};

export default AddCourse;