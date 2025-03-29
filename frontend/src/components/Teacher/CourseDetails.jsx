import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import Assignment from "./Assignment";
import Chapter from "./Chapter";
import AddChapter from "../Modal/AddChapter.modal";
import AddAssignment from "../Modal/AddAssignment.modal";
import AddLecture from "../Modal/AddLecture.modal";
import EditCourse from "../Modal/EditCourse.Modal";
import Lecture from "./Lecture";
import Quiz from "./Quiz";
import AddQuiz from "../AddQuiz";
import { useParams } from "react-router-dom";

const courseData = {
  name: "Name Of Course",
  code: "CS3102",
  createdDate: "January 1, 2024",
  expiryDate: "December 31, 2024",
  instructor: "John Doe, M.Sc. Computer Science",
  over:
    "Dive deep into modern web technologies, mastering frontend frameworks, backend APIs, and database management. This course provides comprehensive learning materials and assignments to prepare you for real-world development.",
};

const AddButton = ({ selectedOption, courseId }) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  // Function to handle modal opening based on selected option
  const handleAddClick = () => {
    setShowModal(true);
  };

  // Determine button text based on selection
  const getButtonText = () => {
    switch (selectedOption) {
      case "Chapter":
        return "Add Chapter";
      case "Assignment":
        return "Add Assignment";
      case "Lecture":
        return "Add Lecture";
      case "Quiz":
        return "Add Quiz";
      default:
        return "Add Item";
    }
  };

  // Determine the modal to render
  const getModalComponent = () => {
    switch (selectedOption) {
      case "Chapter":
        return <AddChapter closeModal={closeModal} courseID={courseId} />;
      case "Assignment":
        return <AddAssignment closeModal={closeModal} courseID={courseId} />;
      case "Lecture":
        return <AddLecture closeModal={closeModal} courseID={courseId} />;
      case "Quiz":
        return <AddQuiz closeModal={closeModal} courseID={courseId} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div
        onClick={handleAddClick}
        className="cursor-pointer text-white p-2 rounded-md bg-purple-500 hover:bg-purple-700 italic font-bold hover:shadow-white hover:shadow-lg"
      >
        {getButtonText()}
      </div>
      {showModal && getModalComponent()}
    </div>
  );
};

const TeacherCourseDetails = () => {
  const [selectedOption, setSelectedOption] = useState("Chapter");
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);

  const { courseId } = useParams();

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

        <div
          onClick={() => setShowEditCourseModal(true)}
          className="absolute top-4 right-4 cursor-pointer rounded-full flex justify-center items-center text-black p-2 hover:bg-green-600 bg-green-200 hover:text-yellow-500"
        >
          <MdEdit size={24} />
        </div>

        <div className="flex flex-col items-start space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg">
          <p><span className="font-semibold">Course Code:</span> <span className="italic">{courseData.code}</span></p>
          <p><span className="font-semibold">Created Date:</span> <span className="italic">{courseData.createdDate}</span></p>
          <p><span className="font-semibold">Expiry Date:</span> <span className="italic">{courseData.expiryDate}</span></p>
          <p><span className="font-semibold">Instructor:</span> <a href="#" className="italic text-green-600">{courseData.instructor}</a></p>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-6">
            <span className="font-semibold">Course Over:</span> <span className="italic">{courseData.over}</span>
          </p>
        </div>

        {/* Dropdown Selector */}
        <div className="w-full flex mt-6 sm:mt-8">
          <select
            className="bg-black text-white text-lg font-bold px-4 py-2 rounded-md cursor-pointer"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="Chapter" className="hover:bg-gray-600"> Chapter</option>
            <option value="Assignment" className="hover:bg-gray-600"> Assignment</option>
            <option value="Lecture" className="hover:bg-gray-600"> Lecture</option>
            <option value="Quiz" className="hover:bg-gray-600"> Quiz</option>
          </select>
        </div>
      </div>

      {/* Render Selected Section */}
      {renderContent()}
      
      {/* Add Button - Changes Based on Selection */}
      <AddButton selectedOption={selectedOption} courseId={courseId} />

      {/* Edit Course Modal */}
      {showEditCourseModal && <EditCourse closeModal={() => setShowEditCourseModal(false)} />}
    </div>
  );
};

export default TeacherCourseDetails;
