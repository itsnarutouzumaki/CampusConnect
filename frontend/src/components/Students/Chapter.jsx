import React from "react";

// Single Chapter Item
const ChapterBar = ({ chapter }) => {
  const { chapterName } = chapter;

  return (
    <div 
      className="w-11/12 p-3 flex flex-col transition-shadow duration-300 mx-auto m-3 rounded-2xl border-4 
      border-blue-500/50  hover:shadow-2xl hover:shadow-black/80"
    >
      <p className="text-2xl text-white font-bold">{chapterName}</p>
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