import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const EditAdmin = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.email) {
      setError("Name and email are required!");
      return;
    }

    try {
      // Handle file upload if file is selected
      let fileUrl = "";
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        
        const uploadResponse = await axios.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        fileUrl = uploadResponse.data.url; // Assuming the response contains the file URL
      }

      // Prepare data to submit
      const adminData = {
        ...formData,
        ...(fileUrl && { profileImage: fileUrl }) // Only include if file was uploaded
      };

      // Submit admin data
      // const response = await axios.put("/api/admins", adminData);
      console.log("Submitting:", adminData);
      
      // On success:
      setError("");
      closeModal();
    } catch (error) {
      console.error("Error updating admin:", error);
      setError("Failed to update admin. Please try again.");
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
          Edit Admin
        </h3>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Admin Name"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.name}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.email}
          required
        />
        <div className="w-[80%] flex flex-col items-center">
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="m-2 w-full"
          />
          {selectedFile && (
            <p className="text-sm text-gray-300">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>
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

export default EditAdmin;