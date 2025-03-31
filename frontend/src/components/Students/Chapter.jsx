import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Single Chapter Item
const ChapterBar = ({ chapter }) => {
  const { chapterName } = chapter;

  return (
    <div 
      className="w-11/12 p-3 flex transition-shadow duration-300 mx-auto m-3 rounded-2xl border-4 
      border-gray-800 hover:shadow-blue-400 shadow-lg"
    >
      <p className="text-xl italic text-white font-sans">{chapterName}</p>
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
  const {courseId} = useParams(); 
  useEffect(() => {
    console.log("Chapter component mounted",courseId);
  },[]);
  return (
    <div className="w-full mx-auto flex flex-col p-4">
      {chapters.map((chapter, index) => (
        <ChapterBar key={index} chapter={chapter} />
      ))}
    </div>
  );
};

export default Chapter;