import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineUserDelete } from "react-icons/ai";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { RiExchange2Line } from "react-icons/ri";
import Addteacher from "../Modal/Addteacher.modal";
import RemoveStudent from "../Modal/RemoveStudent.modal";
import RemoveTeacher from "../Modal/RemoveTeacher.modal";
import { TbHttpDelete } from "react-icons/tb";
import EditAdmin from "../Modal/EditAdmin.modal";
import AddCourse from "../Modal/AddCourse.modal";
import RemoveCourse from "../Modal/RemoveCourse.modal";
import ChangeCourseCoordinator from "../Modal/ChangeCourseCoordinator.modal";

const AdminProfile = () => {
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const closeModalAddTeacher = () => setShowAddTeacherModal(false);

  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const closeModalAddCourse = () => setShowAddCourseModal(false);

  const [showRemoveTeacherModal, setShowRemoveTeacherModal] = useState(false);
  const closeModalRemoveTeacher = () => setShowRemoveTeacherModal(false);

  const [showRemoveStudentModal, setShowRemoveStudentModal] = useState(false);
  const closeModalRemoveStudent = () => setShowRemoveStudentModal(false);

  const [
    showChangeCourseCoordinatorModal,
    setShowChangeCourseCoordinatorModal,
  ] = useState(false);
  const closeModalChangeCourseCoordinator = () =>
    setShowChangeCourseCoordinatorModal(false);

  const [showEditAdminModal, setShowEditAdminModal] = useState(false);
  const closeModalEditAdmin = () => setShowEditAdminModal(false);

  const [showRemoveCourseModal, setShowRemoveCourseModal] = useState(false);
  const closeModalRemoveCourse = () => setShowRemoveCourseModal(false);

  return (
    <div className="w-full">
      <div className="w-fit mx-auto my-9 px-4 md:px-20 py-2 md:bg-white/20 backdrop-blur-[10%] shadow-md rounded-lg md:border hover:shadow-lg transition-shadow duration-100 relative">
        <div className="grid md:grid-cols-3 justify-evenly">
          {/* Edit Icon in Circle */}
          <div
            onClick={() => setShowEditAdminModal(true)}
            className="absolute top-3 right-3 bg-blue-800 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            <FiEdit2 className="w-5 h-5" />
          </div>
          {showEditAdminModal && <EditAdmin closeModal={closeModalEditAdmin} />}

          {/* Centered Icon Links for Actions */}
          <div
            onClick={() => setShowAddTeacherModal(true)}
            className="flex m-6 w-48 h-48 flex-col items-center justify-center bg-green-800 text-white rounded-full hover:bg-green-600 transition-colors cursor-pointer duration-200"
          >
            <IoPersonAddSharp className="w-28 h-28 mb-1" />
            <span className="text-sm font-semibold">Add Teacher</span>
          </div>
          {showAddTeacherModal && (
            <Addteacher closeModal={closeModalAddTeacher} />
          )}

          <div
            onClick={() => setShowAddCourseModal(true)}
            className="flex w-48 m-6 h-48 flex-col items-center justify-center bg-emerald-800 text-white rounded-full cursor-pointer hover:bg-emerald-600 transition-colors duration-200"
          >
            <MdOutlineLibraryAdd className="w-28 h-28 mb-1" />
            <span className="text-sm bg-inherit font-semibold">Add Course</span>
          </div>
          {showAddCourseModal && <AddCourse closeModal={closeModalAddCourse} />}

          <div
            onClick={() => setShowChangeCourseCoordinatorModal(true)}
            className="flex w-48 m-6 h-48 flex-col items-center justify-center bg-amber-600 text-white rounded-full cursor-pointer hover:bg-yellow-500 transition-colors duration-200"
          >
            <RiExchange2Line className="w-28 h-28 mb-1" />
            <span className="text-sm bg-inherit font-semibold w-1/2 justify-center text-center">
              Change Course Coordinator
            </span>
          </div>
          {showChangeCourseCoordinatorModal && (
            <ChangeCourseCoordinator
              closeModal={closeModalChangeCourseCoordinator}
            />
          )}

          <div
            onClick={() => setShowRemoveStudentModal(true)}
            className="flex w-48 m-6 h-48 flex-col items-center justify-center bg-orange-800 text-white rounded-full cursor-pointer hover:bg-orange-600 transition-colors duration-200"
          >
            <AiOutlineUserDelete className="w-28 h-28 mb-1" />
            <span className="text-sm bg-inherit font-semibold">
              Remove Student
            </span>
          </div>
          {showRemoveStudentModal && (
            <RemoveStudent closeModal={closeModalRemoveStudent} />
          )}

          <div
            onClick={() => setShowRemoveTeacherModal(true)}
            className="flex w-48 m-6 h-48 flex-col items-center justify-center bg-red-800 text-white rounded-full hover:bg-red-600 transition-colors cursor-pointer duration-200"
          >
            <AiOutlineUserDelete className="w-28 h-28 mb-1" />
            <span className="text-sm font-semibold">Remove Teacher</span>
          </div>
          {showRemoveTeacherModal && (
            <RemoveTeacher closeModal={closeModalRemoveTeacher} />
          )}

          <div
            onClick={() => setShowRemoveCourseModal(true)}
            className="flex w-48 m-6 h-48 flex-col items-center justify-center bg-red-800 text-white rounded-full hover:bg-red-600 transition-colors cursor-pointer duration-200"
          >
            <TbHttpDelete className="w-28 h-28 mb-1" />
            <span className="text-sm font-semibold">Delete Course</span>
          </div>
          {showRemoveCourseModal && (
            <RemoveCourse closeModal={closeModalRemoveCourse} />
          )}
        </div>

        <div className="w-full h-fit bg-grey-800/20 rounded-lg flex justify-evenly mt-6 py-2">
          <button className="m-2 rounded-lg p-2 bg-blue-400 w-fit hover:bg-gradient-to-r from-[#ee7f7f] via-[#a377ae] to-[#7bdcd3] hover:text-black font-bold cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
