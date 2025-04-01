import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const RemoveCourse = ({ closeModal }) => {
  const [courseId, setCourseId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.delete(`/api/courses/${courseId}`);
      console.log("Course removed successfully:", response.data);
      closeModal(); 
    } catch (error) {
      console.error("Error removing course:", error);
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
          Remove Course
        </h3>
        <p className="text-sm mb-4">
          Are you sure you want to remove this course? This action cannot be
          undone.
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            name="courseId"
            placeholder="Course ID"
            className="m-2 rounded-lg p-2 w-[80%] text-black"
            onChange={(e) => setCourseId(e.target.value)}
            value={courseId}
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

export default RemoveCourse;
