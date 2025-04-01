import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditAssignment from "../Modal/EditAssignment.modal";
import RemoveAssignment from "../Modal/RemoveAssignment.modal";
import axios from 'axios';
// Single Assignment Item
const AssignmentBar = ({ assignment }) => {
  const { title,course,dueDate,url } = assignment;
  
  // State to track completion status
 // const [isCompleted, setIsCompleted] = useState(initialCompleted);

  // Toggle the completion status
  const handleToggleCompletion = () => {
    setIsCompleted(!isCompleted);
  };

  const [showRemoveAssignmentModal, setShowRemoveAssignmentModal] = useState(false);
  const closeModalRemoveAssignment = () => setShowRemoveAssignmentModal(false);

  const [showEditAssignmentModal, setShowEditAssignmentModal] = useState(false);
  const closeModalEditAssignment = () => setShowEditAssignmentModal(false);
  return (
    <div 
      className={`w-11/12 p-3 flex flex-col transition-shadow duration-300 mx-auto m-3 rounded-2xl border-4 border-white shadow-[0_0_15px_#00ff00]`}
    >
      <div className="flex justify-between w-full">
        <p className="text-2xl text-white font-bold">{title}</p>
        <div onClick={() => setShowRemoveAssignmentModal(true)} className="m-2 p-2 cursor-pointer hover:bg-green-500 hover:text-black hover:font-bold hover:shadow-[0px_4px_15px_rgba(0,0,0,0.9)] transition-all duration-200 rounded-md border-2 border-black bg-black text-white ">
          <MdDelete />
        </div>
      </div>
      <div className="flex justify-between w-full mt-2">
        <div>
          <p className="text-base text-white font-medium">{dueDate}</p>
      {/* <p className="text-base text-white font-medium">{assignmentDueTime}</p> */}
        </div>
        <div className="flex items-center">
          <div onClick={() => setShowEditAssignmentModal(true)} className="m-2 p-2 cursor-pointer hover:bg-green-500 hover:text-black hover:font-bold hover:shadow-[0px_4px_15px_rgba(0,0,0,0.9)] transition-all duration-200 rounded-md border-2 border-black bg-black text-white bg-opacity-30">
            <FaEdit />
          </div>
          <div 
            onClick={handleToggleCompletion} 
            className="m-2 p-2 cursor-pointer hover:bg-green-500 hover:text-black hover:font-bold hover:shadow-[0px_4px_15px_rgba(0,0,0,0.9)] transition-all duration-200 rounded-md border-2 border-black bg-black text-white bg-opacity-30">
            View Submission
          </div>
        </div>
      </div>
      {showEditAssignmentModal && <EditAssignment closeModal={closeModalEditAssignment} />}
      {showRemoveAssignmentModal && <RemoveAssignment closeModal={closeModalRemoveAssignment} />}
    </div>
  );
};

// Main Assignment Component
const Assignment = () => {
  // const assignments = [
  //   { title: "Math Homework", marks: 80, totalmarks: 100, dueDate: "2023-12-01", assignmentDueTime: "5:00 PM", completed: false },
  //   { title: "Science Project", marks: 70, totalmarks: 100, dueDate: "2023-12-03", assignmentDueTime: "11:59 PM", completed: true },
  //   { title: "History Essay", marks: 90, totalmarks: 100, dueDate: "2023-12-04", assignmentDueTime: "10:00 AM", completed: false },
  //   { title: "English Literature", marks: 85, totalmarks: 100, dueDate: "2023-12-05", assignmentDueTime: "2:00 PM", completed: true },
  //   { title: "Physics Lab Report", marks: 88, totalmarks: 100, dueDate: "2023-12-06", assignmentDueTime: "4:00 PM", completed: false },
  //   { title: "Art Assignment", marks: 95, totalmarks: 100, dueDate: "2023-12-07", assignmentDueTime: "9:00 AM", completed: true },
  // ];
  const [assignments,setAssginment]=useState([]);
useEffect(() => { 
  const fetchAssignment=async()=>{
  const response=await axios.post("http://localhost:8000/api/assignment/viewAssignmentByTeacher",
    {
      courseId:"67e91feea1165b29f8080a9f"
    }
  );
  console.log(response);
  setAssginment(response.data.data.data);
  }
  fetchAssignment()
}, );   

  

  return (
    <div className="w-full mx-auto flex flex-col p-4">
      {assignments.map((assignment, index) => (
        <AssignmentBar key={index} assignment={assignment} />
      ))}
    </div>
  );
};
export default Assignment;
