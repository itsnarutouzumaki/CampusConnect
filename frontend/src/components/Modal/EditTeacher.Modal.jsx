import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const EditTeacher = ({ closeModal, teacherData, onTeacherUpdated }) => {
  const [formData, setFormData] = useState({
    name: teacherData?.name || "",
    bio: teacherData?.bio || "",
    qualifications: teacherData?.qualifications || "",
    areaOfInterest: teacherData?.areaOfInterest || "",
    profileImage: teacherData?.profileImage || ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.bio.trim()) {
      setError("Bio is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Handle file upload if new file is selected
      let imageUrl = formData.profileImage;
      const uploadFormData = new FormData();
        
      if (selectedFile) {
        
        uploadFormData.append("file", selectedFile);

        // const uploadResponse = await axios.post("/upload", uploadFormData, {
        //   headers: { "Content-Type": "multipart/form-data" }
        // });
        // imageUrl = uploadResponse.data.url; // Assuming the response contains the file URL
      }

      // Prepare teacher data with updated image URL
      const updatedTeacher = {
        ...formData,
        profileImage: imageUrl
      };
      uploadFormData.append("name",formData.name);
      uploadFormData.append("bio",formData.bio);
      uploadFormData.append("areaOfInterst",formData.areaOfInterest);
      uploadFormData.append("qualification",formData.qualifications);
      uploadFormData.append("teacher_id",'67e988c2d8e4aa5b64e02957');
         
   // Update teacher data
      const response = await axios.put("http://localhost:8000/api/teachers/updatedetails",
        uploadFormData,
        {
        headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      onTeacherUpdated(response.data);
      closeModal();
    } catch (error) {
      console.error("Error updating teacher:", error);
      setError(error.response?.data?.message || "Failed to update teacher");
    } finally {
      setIsSubmitting(false);
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
          Edit Teacher
        </h3>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded w-[80%]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="m-2 rounded-lg p-2 w-[80%] text-black"
            onChange={handleInputChange}
            value={formData.name}
            required
          />
          <input
            type="text"
            name="bio"
            placeholder="Bio"
            className="m-2 rounded-lg p-2 w-[80%] text-black"
            onChange={handleInputChange}
            value={formData.bio}
            required
          />
          <input
            type="text"
            name="qualifications"
            placeholder="Qualifications"
            className="m-2 rounded-lg p-2 w-[80%] text-black"
            onChange={handleInputChange}
            value={formData.qualifications}
            required
          />
          <input
            type="text"
            name="areaOfInterest"
            placeholder="areaOfInterest"
            className="m-2 rounded-lg p-2 w-[80%] text-black"
            onChange={handleInputChange}
            value={formData.areaOfInterest}
          />

          <div className="w-[80%] flex flex-col items-start my-2">
            <label className="text-white mb-1">Profile Image:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full"
              accept="image/*"
            />
            {selectedFile && (
              <p className="text-sm text-gray-300 mt-1">
                Selected: {selectedFile.name}
              </p>
            )}
            {!selectedFile && formData.profileImage && (
              <p className="text-sm text-gray-300 mt-1">
                Current image will be kept
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`m-2 rounded-lg p-2 w-fit hover:bg-gradient-to-r from-[#ee7f7f] via-[#a377ae] to-[#7bdcd3] hover:text-black font-bold cursor-pointer ${
              isSubmitting ? "bg-gray-400" : "bg-blue-400"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>,
    document.querySelector(".myPortalModalDiv")
  );
};

export default EditTeacher;