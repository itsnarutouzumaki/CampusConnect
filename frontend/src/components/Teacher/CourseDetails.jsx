import React, { useState } from "react";
import { MdEdit } from "react-icons/md";// Import the pencil icon
import Assignment from "./Assignment";
import Chapter from "./Chapter";
import AddChapter from "../Modal/AddChapter.modal";
import AddAssignment from "../Modal/AddAssignment.modal";
import RemoveCourse from "../Modal/RemoveCourse.modal";
import EditCourse from "../Modal/EditCourse.Modal";

const AddButton = ({ state }) => {
  const [showAddChapterModal, setShowAddChapterModal] = useState(false);
  const closeModalAddChapter = () => setShowAddChapterModal(false);

  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);
  const closeModalAddAssignment = () => setShowAddAssignmentModal(false);

  return (
    <div>
      {state ? (
        <div
          onClick={() => setShowAddChapterModal(true)} // Use setShowAddChapterModal here
          className="bg-black cursor-pointer text-white p-2 rounded-md"
        >
          Add Chapter
        </div>
      ) : (
        <div
          onClick={() => setShowAddAssignmentModal(true)}
          className="bg-black cursor-pointer text-white p-2 rounded-md"
        >
          Add Assignment
        </div>
      )}

      {showAddChapterModal && <AddChapter closeModal={closeModalAddChapter} />}
      {showAddAssignmentModal && <AddAssignment closeModal={closeModalAddAssignment} />}
    </div>
  );
};

const TeacherCourseDetails = () => {
  const [enrolled, setEnrolled] = useState(false);
  const [showChapter, setShowChapter] = useState(false);

  const [showRemoveCourseModal, setShowRemoveCourseModal] = useState(false);
  const closeModalRemoveCourse = () => setShowRemoveCourseModal(false);

  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const closeModalEditCourse = () => setShowEditCourseModal(false);

 

  const handleChapter = () => {
    setShowChapter(!showChapter);
  };

  const [showEditModal, setShowEditModal] = useState(false); // To control the edit modal visibility
  const closeEditModal = () => setShowEditModal(false);

  return (
    <div className="min-h-screen flex flex-col items-center py-8 sm:py-10">
      {/* Course Content */}
      <div className="bg-purple-800 w-full p-6 sm:p-8 md:p-10 rounded-lg shadow-lg text-white flex flex-col relative">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 text-center">
          Name Of Course
        </h1>

        {/* Edit Button at Top Right */}
        <div
          onClick={() => setShowEditCourseModal(true)} // Open the edit modal
          className="absolute top-4 right-4 cursor-pointer rounded-full flex justify-center items-center text-black p-2 hover:bg-green-600 bg-green-200 hover:text-yellow-500"
        >
          <MdEdit size={24}  />
        </div>

        <div className="flex flex-col items-start space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg">
          <p className="flex items-center">
            <span className="font-semibold">Course Code:</span>&nbsp; CS3102
          </p>
          <p className="flex items-center">
            <span className="font-semibold">Created Date:</span>&nbsp; January
            1, 2024
          </p>
          <p className="flex items-center">
            <span className="font-semibold">Expiry Date:</span>&nbsp; December
            31, 2024
          </p>
          <p className="flex items-center">
            <span className="font-semibold">Instructor:</span>&nbsp; John Doe,
            M.Sc. Computer Science
          </p>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base leading-6">
            <span className="font-semibold">Course Overview:</span> Dive deep
            into modern web technologies, mastering frontend frameworks, backend
            APIs, and database management. This course provides comprehensive
            learning materials and assignments to prepare you for real-world
            development.
          </p>
        </div>

        {/* Enroll and Chapter Buttons */}
        <div className="w-full sm:w-2/3 md:w-1/3 flex justify-between mt-6 sm:mt-8">
          <div
            onClick={() => setShowRemoveCourseModal(true)}
            className="bg-black text-white text-xl font-bold px-4 py-2 rounded-full hover:bg-lime-700"
          >
            Delete Course
          </div>

          <div
            onClick={handleChapter}
            className="bg-black text-white text-xl font-bold px-4 py-2 rounded-full hover:bg-lime-700"
          >
            {showChapter ? "View Assignment" : "View Chapter"}
          </div>
        </div>
      </div>

      {/* Conditionally Render Assignment or Chapter */}
      {!showChapter ? <Assignment /> : <Chapter />}
      {showEditCourseModal && <RemoveCourse closeModal={closeModalRemoveCourse} />}
      {/* Add Button */}
      <AddButton state={showChapter} />
      {showEditCourseModal && <EditCourse closeModal={closeModalEditCourse} />}
      
    </div>
  );
};

export default TeacherCourseDetails;
