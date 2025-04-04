import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";


const LectureBar = ({ lecture }) => {
  const { _id, title, videoUrl, startDate, duration } = lecture;
  return (
    <Link
      to={videoUrl}
      target="_blank"
      className="w-11/12 p-3 flex transition-shadow duration-300 mx-auto m-3 rounded-2xl border-4 
      border-gray-800 hover:shadow-blue-400 shadow-lg justify-between items-center"
    >
      <p className="text-xl flex italic text-white font-sans">
        <span className="text-white no-underline">{title}</span>
      </p>
      <span className="text-gray-400 text-sm italic">{`Duration: ${duration}min at ${startDate
          ? new Date(startDate)
            .toISOString()
            .split("T")[1]
            .split(":")
            .slice(0, 2)
            .join(":")
          : "N/A"
        } on ${startDate ? new Date(startDate).toISOString().split("T")[0] : "N/A"
        }`}</span>
      <div className="flex p-1">
        <div className="cursor-pointer w-fit h-fit text-white mr-2 bg-white/30 p-1 rounded-md hover:text-black hover:bg-orange-300">
          <MdEdit />
        </div>
        <div className="cursor-pointer h-fit w-fit text-white mr-2 bg-white/30 p-1 rounded-md hover:text-black hover:bg-orange-300">
          <MdDelete />
        </div>
      </div>
    </Link>
  );
};





const Lecture = ({courseID}) => {
  const [Lectures, setLectures] = useState([]);
  useEffect(() => {
    console.log(courseID);
    const fetchLecture = async () => {
      try {
        const response = await axios.post(
          "/api/chapterLecture/getAllLectures",
          {
            courseId: courseID,
          }
        );
        console.log(response);
        setLectures(response.data.data);
        
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };

    fetchLecture();
  }, [courseID]);

  // const { courseId } = useParams();



  return (
    <div className="w-full mx-auto flex flex-col p-4">
      {Lectures.map((lecture) => (
        <LectureBar key={lecture.lectureid} lecture={lecture} id={lecture._id} />
      ))}
    </div>
  )
};

export default Lecture;
