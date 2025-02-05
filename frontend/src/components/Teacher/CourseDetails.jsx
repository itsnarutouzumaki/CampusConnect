import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import Assignment from "./Assignment";
import Chapter from "./Chapter";
import AddChapter from "../Modal/AddChapter.modal";
import AddAssignment from "../Modal/AddAssignment.modal";
import RemoveCourse from "../Modal/RemoveCourse.modal";
import EditCourse from "../Modal/EditCourse.Modal";

const courseData = {
  name: "Name Of Course",
  code: "CS3102",
  createdDate: "January 1, 2024",
  expiryDate: "December 31, 2024",
  instructor: "John Doe, M.Sc. Computer Science",
  overview:
    "Dive deep into modern web technologies, mastering frontend frameworks, backend APIs, and database management. This course provides comprehensive learning materials and assignments to prepare you for real-world development.",
};

const AddButton = ({ isChapter }) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  return (
    <div>
      <div
        onClick={() => setShowModal(true)}
        className=" cursor-pointer text-white p-2 rounded-md bg-purple-500 hover:bg-purple-700 italic font-bold hover:shadow-white hover:shadow-lg"
      >
        {isChapter ? "Add Chapter" : "Add Assignment"}
      </div>
      {showModal && (isChapter ? <AddChapter closeModal={closeModal} /> : <AddAssignment closeModal={closeModal} />)}
    </div>
  );
};

const TeacherCourseDetails = () => {
  const [showChapter, setShowChapter] = useState(false);
  const [showRemoveCourseModal, setShowRemoveCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center py-8 sm:py-10">
      <div className="bg-white/20 backdrop-blur-[10%] w-full p-6 sm:p-8 md:p-10 rounded-lg shadow-lg text-white flex flex-col relative">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 italic text-center">
          {courseData.name}
        </h1>

        <div
          onClick={() => setShowEditCourseModal(true)}
          className="absolute top-4 right-4 cursor-pointer rounded-full flex justify-center items-center text-black p-2 hover:bg-green-600 bg-green-200 hover:text-yellow-500"
        >
          <MdEdit size={24} />
        </div>

        <div className="flex flex-col items-start space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg">
          <p><span className="font-semibold">Course Code:</span> {courseData.code}</p>
          <p><span className="font-semibold">Created Date:</span> {courseData.createdDate}</p>
          <p><span className="font-semibold">Expiry Date:</span> {courseData.expiryDate}</p>
          <p><span className="font-semibold">Instructor:</span> {courseData.instructor}</p>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-6">
            <span className="font-semibold">Course Overview:</span> {courseData.overview}
          </p>
        </div>

        <div className="w-full sm:w-2/3 md:w-1/3 flex justify-between mt-6 sm:mt-8">
          

          <div
            onClick={() => setShowChapter(!showChapter)}
            className="bg-black text-white text-xl font-bold px-4 py-2 rounded-full hover:bg-lime-700"
          >
            {showChapter ? "View Assignment" : "View Chapter"}
          </div>
        </div>
      </div>

      {!showChapter ? <Assignment /> : <Chapter />}
      {showRemoveCourseModal && <RemoveCourse closeModal={() => setShowRemoveCourseModal(false)} />}
      <AddButton isChapter={showChapter} />
      {showEditCourseModal && <EditCourse closeModal={() => setShowEditCourseModal(false)} />}
    </div>
  );
};

export default TeacherCourseDetails;
