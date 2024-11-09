import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditChapter from "../Modal/EditChapter.modal";
import RemoveChapter from "../Modal/RemoveChapter.modal";

const ChapterBar = ({ chapter }) => {
  const { chapterName } = chapter;
  const [showRemoveChapterModal, setShowRemoveChapterModal] = useState(false);
  const closeModalRemoveChapter = () => setShowRemoveChapterModal(false);

  const [showEditChapterModal, setShowEditChapterModal] = useState(false);
  const closeModalEditChapter = () => setShowEditChapterModal(false);
  return (
    <div
      className="w-11/12 p-3 flex transition-shadow duration-300 mx-auto m-3 rounded-xl border-4 
      border-blue-500 bg-blue-100 hover:shadow-2xl hover:shadow-black/80 items-center justify-between"
    >
      <p className="text-2xl  text-black font-bold">{chapterName}</p>
      <div className="flex p-1">
        <div
          onClick={() => setShowEditChapterModal(true)}
          className="m-2 p-2 cursor-pointer hover:bg-green-500 hover:text-black hover:font-bold hover:shadow-[0px_4px_15px_rgba(0,0,0,0.9)] transition-all duration-200 rounded-md border-2 border-black bg-black text-white bg-opacity-30"
        >
          <FaEdit />
        </div>
        <div
          onClick={() => setShowRemoveChapterModal(true)}
          className="m-2 p-2 cursor-pointer hover:bg-green-500 hover:text-black hover:font-bold hover:shadow-[0px_4px_15px_rgba(0,0,0,0.9)] transition-all duration-200 rounded-md border-2 border-black bg-black text-white bg-opacity-30"
        >
          <MdDelete />
        </div>
      </div>
      {showEditChapterModal && (
        <EditChapter closeModal={closeModalEditChapter} />
      )}
      {showRemoveChapterModal && (
        <RemoveChapter closeModal={closeModalRemoveChapter} />
      )}
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
