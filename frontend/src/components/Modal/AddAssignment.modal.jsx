import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const AddAssignment = ({ courseID,closeModal }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const [data, setdata] = useState({});
  const HandleAddAssignment=async()=>{
    setdata({...data,course: courseID});
  }

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
          Add Assignment
        </h3>
        <input
          type="text"
          placeholder="Assignment Name"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={(e) => setdata({ ...data, title: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Expiry Date"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={(e) => setdata({ ...data, date: e.target.value })}
          required
        />
        <input
          type="time"
          placeholder="Expiry Time"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={(e) => setdata({ ...data, time: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="Google Drive Link"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={(e) => setdata({ ...data, url: e.target.value })}
          required
        />
        <button
          className="m-2 rounded-lg p-2 bg-blue-400 w-fit hover:bg-gradient-to-r from-[#ee7f7f] via-[#a377ae] to-[#7bdcd3] hover:text-black font-bold cursor-pointer"
          onClick={HandleAddAssignment}
        >
          Add Assignment
        </button>
      </div>
    </div>,
    document.querySelector(".myPortalModalDiv")
  );
};

export default AddAssignment;
