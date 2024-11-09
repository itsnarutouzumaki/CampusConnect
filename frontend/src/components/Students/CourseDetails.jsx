import React, { useState } from 'react';
import Assignment from './Assignment';
import Chapter from './Chapter';

const CourseDetails = () => {
  const [enrolled, setEnrolled] = useState(false);
  const [showChapter, setshowChapter] = useState(false);

  const handleEnroll = () => {
    setEnrolled(!enrolled);
  };

  const handleChapter = () => {
    setshowChapter(!showChapter);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-200 py-8 sm:py-10">
      {/* Course Content */}
      <div className="bg-purple-800 w-full p-6 sm:p-8 md:p-10 rounded-lg shadow-lg text-white flex flex-col">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 text-center">Name Of Course</h1>
        
        <div className="flex flex-col items-start space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg">
        <p className="flex items-center">
            <span className="font-semibold">Course Code:</span>&nbsp; CS3102
          </p>
          <p className="flex items-center">
            <span className="font-semibold">Created Date:</span>&nbsp; January 1, 2024
          </p>
          <p className="flex items-center">
            <span className="font-semibold">Expiry Date:</span>&nbsp; December 31, 2024
          </p>
          <p className="flex items-center">
            <span className="font-semibold">Instructor:</span>&nbsp; John Doe, M.Sc. Computer Science
          </p>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-6">
            <span className="font-semibold">Course Overview:</span> Dive deep into modern web technologies, mastering frontend frameworks, backend APIs, and database management. This course provides comprehensive learning materials and assignments to prepare you for real-world development.
          </p>
        </div>

        {/* Enroll and Chapter Buttons */}
        <div className="w-full sm:w-2/3 md:w-1/3 flex justify-between mt-6 sm:mt-8">
          <div
            onClick={handleEnroll}
            className="bg-black text-white text-xl font-bold px-4 py-2 rounded-full  hover:bg-lime-700"
          >
            {enrolled ? "UnEnroll" : "Enroll Now"}
          </div>

          <div
            onClick={handleChapter}
            className="bg-black text-white text-xl font-bold px-4 py-2 rounded-full hover:bg-lime-700"
          >
            {showChapter ? "View Assignment" : "View Chapter"}
          </div>
        </div>
      </div>

      {/* Conditionally Render Assignment */}
      {!showChapter && <Assignment />}
      {showChapter && <Chapter />}
      {/* Footer */}
    </div>
  );
};

export default CourseDetails;
