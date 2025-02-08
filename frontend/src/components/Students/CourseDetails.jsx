import React, { useState } from "react";
import Assignment from "./Assignment";
import Chapter from "./Chapter";
import Lecture from "./Lecture";
import Quiz from "./Quiz";

const courseData = {
  name: "Name Of Course",
  code: "CS3102",
  createdDate: "January 1, 2024",
  expiryDate: "December 31, 2024",
  instructor: "John Doe, M.Sc. Computer Science",
  overview:
    "Dive deep into modern web technologies, mastering frontend frameworks, backend APIs, and database management. This course provides comprehensive learning materials and assignments to prepare you for real-world development.",
  enrolled: false,
};

const StudentCourseDetails = () => {
  const [selectedOption, setSelectedOption] = useState("Chapter");
  const [isEnrolled, setIsEnrolled] = useState(courseData.enrolled);

  const enrollMe = () => {
    setIsEnrolled(true);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "Assignment":
        return <Assignment />;
      case "Chapter":
        return <Chapter />;
      case "Lecture":
        return <Lecture />;
      case "Quiz":
        return <Quiz />;
      default:
        return <Chapter />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 sm:py-10">
      <div className="bg-white/20 backdrop-blur-[10%] w-full p-6 sm:p-8 md:p-10 rounded-lg shadow-lg text-white flex flex-col relative">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 italic text-center">
          {courseData.name}
        </h1>

        <div className="flex flex-col items-start space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg">
          <p>
            <span className="font-semibold">Course Code:</span>{" "}
            <span className="italic">{courseData.code}</span>
          </p>
          <p>
            <span className="font-semibold">Created Date:</span>{" "}
            <span className="italic">{courseData.createdDate}</span>
          </p>
          <p>
            <span className="font-semibold">Expiry Date:</span>{" "}
            <span className="italic">{courseData.expiryDate}</span>
          </p>
          <p>
            <span className="font-semibold">Instructor:</span>{" "}
            <a href="#" className="italic text-green-600">
              {courseData.instructor}
            </a>
          </p>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-6">
            <span className="font-semibold">Course Overview:</span>{" "}
            <span className="italic">{courseData.overview}</span>
          </p>
        </div>

        {/* Dropdown Selector */}

        <div className="w-full flex mt-6 sm:mt-8">
          {!isEnrolled ? (
            <div
              onClick={enrollMe}
              className="cursor-pointer font-bold text-lg text-white bg-blue-300 hover:bg-purple-600 italic py-2 rounded-lg w-fit px-10"
            >
              Enroll
            </div>
          ) : (
            <select
              className="bg-black text-white text-lg font-bold px-4 py-2 rounded-md cursor-pointer"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="Chapter">Chapter</option>
              <option value="Assignment">Assignment</option>
              <option value="Lecture">Lecture</option>
              <option value="Quiz">Quiz</option>
            </select>
          )}
        </div>
      </div>

      {/* Render Selected Section */}
      {isEnrolled && renderContent()}
    </div>
  );
};

export default StudentCourseDetails;
