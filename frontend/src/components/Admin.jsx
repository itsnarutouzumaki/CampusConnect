import React, { useState } from 'react';
import { FiEdit2 } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineUserDelete } from "react-icons/ai";
import Addteacher from './Modal/Addteacher.modal';
import RemoveStudent from './Modal/RemoveStudent.modal';
import RemoveTeacher from './Modal/RemoveTeacher.modal';
import EditAdmin from './Modal/EditAdmin.modal';


const AdminProfile = () => {
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const closeModalAddTeacher = () => setShowAddTeacherModal(false);

  const [showRemoveTeacherModal, setShowRemoveTeacherModal] = useState(false);
  const closeModalRemoveTeacher = () => setShowRemoveTeacherModal(false);

  const [showRemoveStudentModal, setShowRemoveStudentModal] = useState(false);
  const closeModalRemoveStudent = () => setShowRemoveStudentModal(false);

  const [showEditAdminModal, setShowEditAdminModal] = useState(false);
  const closeModalEditAdmin = () => setShowEditAdminModal(false);

  return (
    <div className="w-full">
      <div className="w-full mx-auto mt-3 px-4 md:px-20 py-2 bg-white/20 backdrop-blur-[10%] flex flex-col md:flex-row items-center md:justify-between shadow-md rounded-lg border hover:shadow-lg transition-shadow duration-300 relative">
        
        {/* Edit Icon in Circle */}
        <div onClick={() => setShowEditAdminModal(true)} className="absolute top-3 right-3 bg-blue-800 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
          <FiEdit2 className="w-5 h-5" />
        </div>
        {showEditAdminModal && <EditAdmin closeModal={closeModalEditAdmin} />}

        {/* Profile Image and Name */}
        <div className="flex flex-col items-center md:items-start mt-6 md:m-3">
          <img
            className="w-48 h-48 rounded-full border object-cover"
            src="https://preview.redd.it/how-strong-is-jiraiya-v0-0hdtt6zrqycb1.jpg?width=450&format=pjpg&auto=webp&s=2a4969be966363c03b43dd59788f110d3929f6ca"
            alt="Teacher Profile"
          />
          <p className="mt-1 ml-7 text-lg font-bold text-gray-500 text-center tracking-wide rounded-md px-2 py-1 shadow-sm">
            Master Jiraiya
          </p>
        </div>

        {/* Centered Icon Links for Actions */}
        
          <div onClick={() => setShowAddTeacherModal(true)} className="flex w-48 h-48 flex-col items-center justify-center  bg-purple-800 text-white rounded-full hover:bg-purple-600 transition-colors cursor-pointer duration-200">
            <IoPersonAddSharp className="w-28 h-28 mb-1" />
            <span className="text-sm font-semibold">Add Teacher</span>
          </div>
          {showAddTeacherModal && <Addteacher closeModal={closeModalAddTeacher} />}


          <div onClick={() => setShowRemoveTeacherModal(true)} className="flex w-48 h-48 flex-col items-center justify-center  bg-green-800 text-white rounded-full hover:bg-green-600 transition-colors cursor-pointer duration-200">
          <AiOutlineUserDelete className="w-28 h-28 mb-1" />
            <span className="text-sm font-semibold">Remove Teacher</span>
          </div>
          {showRemoveTeacherModal && <RemoveTeacher closeModal={closeModalRemoveTeacher} />}


          <div onClick={() => setShowRemoveStudentModal(true)} className="flex w-48 h-48 flex-col items-center justify-center  bg-yellow-800 text-white rounded-full cursor-pointer hover:bg-yellow-600 transition-colors duration-200">
            <AiOutlineUserDelete className="w-28 h-28 mb-1" />
            <span className="text-sm bg-inherit font-semibold">Remove Student</span>
          </div>
          {showRemoveStudentModal && <RemoveStudent closeModal={closeModalRemoveStudent} />}

      </div>
    </div>
  );
};

export default AdminProfile;
