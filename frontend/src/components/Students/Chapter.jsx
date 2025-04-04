import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ChapterBar = ({ chapter }) => {
  const { title,url } = chapter;

  return (
    <div
      className="w-11/12 p-3 flex transition-shadow duration-300 mx-auto m-3 rounded-2xl border-4 
      border-gray-800 hover:shadow-blue-400 shadow-lg"
    >
      <Link to={url} target="_black" className="text-xl italic text-white font-sans">{title}</Link>
    </div>
  );
};

const Chapter = ({courseID}) => {
  const [chapters, setChapters] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        
        const response = await axios.post(
          "http://localhost:8000/api/chapterLecture/getAllChapters",
          {
            course_id:courseID ,
          }
        );
        
        setChapters(response.data.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, [courseID]);

  return (
    <div className="w-full mx-auto flex flex-col p-4">
      {chapters.map((chapter, index) => (
        <ChapterBar key={index} chapter={chapter} />
      ))}
    </div>
  );
};

export default Chapter;
