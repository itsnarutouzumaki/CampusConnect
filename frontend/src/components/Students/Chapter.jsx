import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Single Chapter Item
const ChapterBar = ({ chapter }) => {
  const { title } = chapter;

  return (
    <div
      className="w-11/12 p-3 flex transition-shadow duration-300 mx-auto m-3 rounded-2xl border-4 
      border-gray-800 hover:shadow-blue-400 shadow-lg"
    >
      <p className="text-xl italic text-white font-sans">{title}</p>
    </div>
  );
};

// Main Chapter Component
const Chapter = () => {
  const [chapters, setChapters] = useState([
    { title: "Introduction to Algebra" },
    { title: "Chemical Reactions" },
    { title: "World War II" },
    { title: "Shakespearean Literature" },
    { title: "Newton's Laws of Motion" },
    { title: "Art and Expressionism" },
  ]);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.post(
          "/api/chapterLecture/getAllChapters",
          {
            course_id:  "67eaa21786a568b53909b7fd", // Use courseId from params or fallback
          }
        );
        const fetchedChapters = response.data.data.map((item) => ({
          title: item.title,
        }));
        setChapters((prev) => [...prev, ...fetchedChapters]);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, [courseId]);

  return (
    <div className="w-full mx-auto flex flex-col p-4">
      {chapters.map((chapter, index) => (
        <ChapterBar key={index} chapter={chapter} />
      ))}
    </div>
  );
};

export default Chapter;
