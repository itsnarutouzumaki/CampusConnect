import React from 'react';
import { FiEdit2 } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineUserDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const AdminProfile = () => {
  return (
    <div className="w-full">
      <div className="w-full mx-auto mt-3 px-4 md:px-20 py-2 bg-red-400 flex flex-col md:flex-row items-center md:justify-between shadow-md rounded-lg border hover:shadow-lg transition-shadow duration-300 relative">
        
        {/* Edit Icon in Circle */}
        <div className="absolute top-1 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
          <FiEdit2 className="w-5 h-5" />
        </div>

        {/* Profile Image and Name */}
        <div className="flex flex-col items-center md:items-start mt-6 md:m-3">
          <img
            className="w-48 h-48 rounded-full border object-cover"
            src="https://preview.redd.it/how-strong-is-jiraiya-v0-0hdtt6zrqycb1.jpg?width=450&format=pjpg&auto=webp&s=2a4969be966363c03b43dd59788f110d3929f6ca"
            alt="Teacher Profile"
          />
          <p className="mt-1 ml-7 text-lg font-bold text-gray-600 text-center tracking-wide 
             border border-gray-300 rounded-md bg-gray-100 px-2 py-1 shadow-sm">
            Admin Name
          </p>
        </div>

        {/* Centered Icon Links for Actions */}
        
          <Link to="/delete-student" className="flex w-48 h-48 flex-col items-center justify-center  bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-200">
            <AiOutlineUserDelete className="w-28 h-28 mb-1" />
            <span className="text-sm font-semibold">Delete Student</span>
          </Link>
          
          <Link to="/add-teacher" className="flex w-48 h-48 flex-col items-center justify-center  bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200">
            <IoPersonAddSharp className="w-28 h-28 mb-1" />
            <span className="text-sm font-semibold">Add Teacher</span>
          </Link>
          
          <Link to="/delete-teacher" className="flex w-48 h-48 flex-col items-center justify-center  bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-200">
            <AiOutlineUserDelete className="w-28 h-28 mb-1" />
            <span className="text-sm font-semibold">Delete Teacher</span>
          </Link>
        
      </div>
    </div>
  );
};

export default AdminProfile;
