import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const LectureBar = ({ lecture }) => {
  const { lectureId, lectureName, lectureLink, hours, minutes, time, date } =
    lecture;
  return (
    <div
      className="w-11/12 p-3 flex transition-shadow duration-300 mx-auto m-3 rounded-2xl border-4 
      border-gray-800 hover:shadow-blue-400 shadow-lg justify-between items-center"
    >
      <p className="text-xl flex italic text-white font-sans">
        <a
          href={lectureLink}
          className="text-white no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {lectureName}
        </a>
        <span className="text-gray-400 text-sm italic">{`Duration: ${hours}hrs ${minutes}min at ${time} ${date}`}</span>
      </p>
    </div>
  );
};

const Lecture = () => {
  const lectures = [
    {
      lectureid: 1,
      lectureName: "Introduction to Algebra",
      lectureLink: "https://www.youtube.com/watch?v=9vKqVkMQHKk",
      hours: 1,
      minutes: 30,
      time: "10:30 AM",
      date: "2023-12-01",
    },
    {
      lectureid: 2,
      lectureName: "Advanced Geometry",
      lectureLink: "https://www.youtube.com/watch?v=xyz",
      hours: 2,
      minutes: 15,
      time: "02:00 PM",
      date: "2023-12-02",
    },
  ];

  return (
    <div className="w-full mx-auto flex flex-col p-4">
      {lectures.map((lecture) => (
        <LectureBar key={lecture.lectureid} lecture={lecture} />
      ))}
    </div>
  );
};

export default Lecture;
