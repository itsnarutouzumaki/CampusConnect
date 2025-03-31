import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const EditChapter = ({ closeModal, chapterData, onChapterUpdated }) => {
  const [formData, setFormData] = useState({
    name: chapterData?.name || "",
    url: chapterData?.driveLink || "",
    chapter_id: chapterData?.chapter_id || ""
  });
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === "driveLink") {
      setFormData(prev => ({
      ...prev,
      url: value
      }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Chapter name is required");
      return false;
    }
    if (!formData.url.trim()) {
      setError("Google Drive link is required");
      return false;
    }
    try {
      new URL(formData.url);
    } catch (e) {
      setError("Please enter a valid URL");
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
      const actualData={...formData,chapter_id:'67e6f816d30cbb7633efe4dd'};
      console.log(actualData);
      // Replace with your actual API endpoint
      const response = await axios.put(
        '/api/chapterLecture/editChapter',
        actualData
      );
      console.log(response);
      
      closeModal();
    } catch (error) {
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
          Edit Chapter
        </h3>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            name="name"
            placeholder="Chapter Name"
            className="m-2 rounded-lg p-2 w-[80%] text-black"
            onChange={handleInputChange}
            value={formData.name}
            required
          />
          <input
            type="url"
            name="driveLink"
            placeholder="Google Drive Link"
            className="m-2 rounded-lg p-2 w-[80%] text-black"
            onChange={handleInputChange}
            value={formData.url}
            required
          />
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

export default EditChapter;