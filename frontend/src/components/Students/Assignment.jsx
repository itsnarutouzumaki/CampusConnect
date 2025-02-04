import React, { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

const AssignmentBar = ({ assignment }) => {
  const { AssignmentName, marks, totalmarks, assignmentDueDate, assignmentDueTime, completed: initialCompleted } = assignment;
  const [isCompleted, setIsCompleted] = useState(initialCompleted);

  const handleToggleCompletion = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div 
      className={`w-11/12 p-3 flex flex-col transition-all duration-300 mx-auto m-3 rounded-2xl border-4 
      ${isCompleted ? 'border-white shadow-[0_0_15px_#00ff00]' : 'border-white shadow-[0_0_15px_#ff0000]'} `}
    >
      <div className="flex justify-between w-full">
        <p className="text-2xl text-white font-bold">{AssignmentName}</p>
        <p className="text-base text-white font-medium">{marks}/{totalmarks}</p>
      </div>
      <div className="flex justify-between w-full mt-2">
        <div>
          <p className="text-base text-white font-medium">{assignmentDueDate}</p>
          <p className="text-base text-white font-medium">{assignmentDueTime}</p>
        </div>
        <div className="flex items-center">
          <div className="m-2 p-2 cursor-pointer hover:bg-green-500 hover:text-white hover:font-bold 
            hover:shadow-[0px_0px_15px_#00ff00] transition-all duration-200 rounded-md border-2 border-black bg-black text-white bg-opacity-30">
            <MdOutlineFileUpload />
          </div>
          <div 
            onClick={handleToggleCompletion} 
            className="m-2 p-2 cursor-pointer hover:bg-green-500 hover:text-white hover:font-bold 
            hover:shadow-[0px_0px_15px_#00ff00] transition-all duration-200 rounded-md border-2 border-black bg-black text-white bg-opacity-30">
            {isCompleted ? "Unsubmit" : "Submit"}
          </div>
        </div>
      </div>
    </div>
  );
};

const Assignment = () => {
  const assignments = [
    {
      AssignmentName: "Math Homework",
      marks: 80,
      totalmarks: 100,
      assignmentDueDate: "2023-12-01",
      assignmentDueTime: "5:00 PM",
      completed: false,
    },
    {
      AssignmentName: "Science Project",
      marks: 70,
      totalmarks: 100,
      assignmentDueDate: "2023-12-03",
      assignmentDueTime: "11:59 PM",
      completed: true,
    },
    {
      AssignmentName: "History Essay",
      marks: 90,
      totalmarks: 100,
      assignmentDueDate: "2023-12-04",
      assignmentDueTime: "10:00 AM",
      completed: false,
    },
    {
      AssignmentName: "English Literature",
      marks: 85,
      totalmarks: 100,
      assignmentDueDate: "2023-12-05",
      assignmentDueTime: "2:00 PM",
      completed: true,
    },
    {
      AssignmentName: "Physics Lab Report",
      marks: 88,
      totalmarks: 100,
      assignmentDueDate: "2023-12-06",
      assignmentDueTime: "4:00 PM",
      completed: false,
    },
    {
      AssignmentName: "Art Assignment",
      marks: 95,
      totalmarks: 100,
      assignmentDueDate: "2023-12-07",
      assignmentDueTime: "9:00 AM",
      completed: true,
    },
  ];

  return (
    <div className="w-full mx-auto flex flex-col p-4">
      {assignments.map((assignment, index) => (
        <AssignmentBar key={index} assignment={assignment} />
      ))}
    </div>
  );
};

export default Assignment;
