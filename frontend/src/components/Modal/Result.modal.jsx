import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Result = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-gray-900 text-white p-6 rounded-lg max-w-lg w-full sm:w-[500px] z-50 flex flex-col text-center shadow-lg hover:border-2 hover:border-white hover:shadow-2xl hover:shadow-gray-500 transition-all justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-black underline text-white text-lg my-3">
          Result Of Your Quiz
        </h2>
       <diV>
        <h4 className="font-bold text-white text-lg my-3">Total Questions: 10</h4>
        <h4 className="font-bold text-white text-lg my-3">Correct Answers: 8</h4>
        <h4 className="font-bold text-white text-lg my-3">Wrong Answers: 2</h4>
        <h4 className="font-bold text-white text-lg my-3">Total marks : 8 </h4>
        
       </diV>
      </div>
    </div>,
    document.querySelector(".myPortalModalDiv")
  );
};

export default Result;
