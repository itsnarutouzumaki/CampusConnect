import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddLecture = ({ courseID, closeModal }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const [data, setData] = useState({
    title: "",
    startDate: "",
    time: "",
    videoUrl: "",
    duration: "",
  });

  const handleAddLecture = async () => {
    try {
      const lectureData = { ...data, course: courseID };
      console.log(lectureData);
      const response = await axios.post(
        "/api/chapterLecture/addLecture",
        lectureData
      );
      console.log(response);
      toast.success("Lecture Added Successfully", {
        duration: 2000,
        position: "top-center",
      });
      closeModal();
    } catch (error) {
      console.error("Error adding lecture:", error);
      toast.error("Failed to add lecture. Please try again.", {
        duration: 2000,
        position: "top-center",
      });
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
          Add Lecture
        </h3>
        <input
          type="text"
          placeholder="Lecture Name"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={(e) => setData({ ...data, title: e.target.value })}
          value={data.title}
          required
        />
        <input
          type="date"
          placeholder="Date"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={(e) => setData({ ...data, startDate: e.target.value })}
          value={data.startDate}
          required
        />
        <input
          type="time"
          placeholder="Time"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={(e) => setData({ ...data, time: e.target.value })}
          value={data.time}
          required
        />
        <input
          type="url"
          placeholder="Lecture Link"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={(e) => setData({ ...data, videoUrl: e.target.value })}
          value={data.videoUrl}
          required
        />
        <input
          type="text"
          placeholder="Duration in minutes"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={(e) => setData({ ...data, duration: e.target.value })}
          value={data.duration}
          required
        />
        <button
          className="m-2 rounded-lg p-2 bg-blue-400 w-fit hover:bg-gradient-to-r from-[#ee7f7f] via-[#a377ae] to-[#7bdcd3] hover:text-black font-bold cursor-pointer"
          onClick={handleAddLecture}
        >
          Add Lecture
        </button>
      </div>
    </div>,
    document.querySelector(".myPortalModalDiv")
  );
};

export default AddLecture;
