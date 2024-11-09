import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// Single Chapter Item
const ChapterBar = ({ chapter }) => {
  const { chapterName } = chapter;

  return (
    <div 
      className="w-11/12 p-3 flex transition-shadow duration-300 mx-auto m-3 rounded-xl border-4 
      border-blue-500 bg-blue-100 hover:shadow-2xl hover:shadow-black/80 items-center justify-between"
    >
      <p className="text-2xl  text-black font-bold">{chapterName}</p>
      <div className="flex p-1">
      <div className="m-2 p-2 cursor-pointer hover:bg-green-500 hover:text-black hover:font-bold hover:shadow-[0px_4px_15px_rgba(0,0,0,0.9)] transition-all duration-200 rounded-md border-2 border-black bg-black text-white bg-opacity-30">
          <FaEdit />
      </div>
      <div className="m-2 p-2 cursor-pointer hover:bg-green-500 hover:text-black hover:font-bold hover:shadow-[0px_4px_15px_rgba(0,0,0,0.9)] transition-all duration-200 rounded-md border-2 border-black bg-black text-white bg-opacity-30">
          <MdDelete />
      </div>
      </div>
    </div>
  );
};

// Main Chapter Component
const Chapter = () => {
  const chapters = [
    { chapterName: "Introduction to Algebra" },
    { chapterName: "Chemical Reactions" },
    { chapterName: "World War II" },
    { chapterName: "Shakespearean Literature" },
    { chapterName: "Newton's Laws of Motion" },
    { chapterName: "Art and Expressionism" },
  ];

  return (
    <div className="w-full mx-auto flex flex-col p-4">
      {chapters.map((chapter, index) => (
        <ChapterBar key={index} chapter={chapter} />
      ))}
      
    </div>
  );
};

export default Chapter;